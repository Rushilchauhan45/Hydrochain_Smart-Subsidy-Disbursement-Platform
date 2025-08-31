import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import profileService from '../services/profileService';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingVerification, setPendingVerification] = useState(null);
  const [profileComplete, setProfileComplete] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [hasCheckedProfile, setHasCheckedProfile] = useState(false);

  // Check profile completion status
  const checkProfileCompletion = async (skipDelay = false) => {
    try {
      console.log('🔍 Checking profile completion...');
      const response = await profileService.checkProfileCompletion();
      console.log('📋 Profile completion response:', response);
      setProfileComplete(response.isComplete);
      
      // Show modal if profile is incomplete and user is one of the supported roles
      // Only show if we haven't already checked (first time login)
      if (!response.isComplete && ['government', 'producer', 'auditor', 'bank'].includes(response.role) && !hasCheckedProfile) {
        console.log(`🏛️ ${response.role} user with incomplete profile - showing modal in ${skipDelay ? '0' : '3'} seconds`);
        setHasCheckedProfile(true);
        
        // Add 3-second delay before showing the modal (unless skipped)
        const delay = skipDelay ? 0 : 3000;
        setTimeout(() => {
          setShowProfileModal(true);
        }, delay);
      } else {
        console.log('✅ Profile complete or not a role requiring completion');
      }
      
      return response;
    } catch (err) {
      console.error('❌ Failed to check profile completion:', err);
      return { isComplete: true }; // Default to complete to avoid blocking
    }
  };

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isLoggedIn()) {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
          
          // Check profile completion after setting user (no delay on init)
          await checkProfileCompletion(true); // true = skip delay on initialization
        }
      } catch (err) {
        console.error('Failed to initialize authentication:', err);
        // If token is invalid, clear it
        if (err.message === 'Token is not valid') {
          authService.logout();
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Register function - Step 1: Create account with basic details
  // Send OTP function - Step 1: Send OTP without creating account
  const sendOTP = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.sendOTP(userData);
      if (response.success) {
        // Store pending data for step 2
        setPendingVerification({
          email: response.email,
          userData: userData,
          otp: response.otp // For demo purposes
        });
        return { needsVerification: true, ...response };
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and create account function - Step 2: Verify OTP and create account
  const verifyOTPAndCreateAccount = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verifyOTPAndCreateAccount(email, otp);
      if (response.success) {
        // Account created and verified, set user as current user
        setCurrentUser(response.user);
        setPendingVerification(null);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function (keeping for backward compatibility)
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.success && response.user) {
        // Don't set currentUser yet - user needs to verify OTP first
        setPendingVerification({
          userId: response.user.id,
          email: response.user.email,
          role: response.user.role,
          otp: response.otp // For demo purposes
        });
        return { needsVerification: true, ...response };
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP function - Step 2: Verify email
  const verifyOTP = async (userId, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verifyOTP(userId, otp);
      if (response.success) {
        // After OTP verification, set the user as current user
        setCurrentUser(response.user);
        setPendingVerification(null);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔑 Attempting login for:', email);
      const response = await authService.login(email, password);
      if (response.success && response.user) {
        console.log('✅ Login successful for user:', response.user);
        setCurrentUser(response.user);
        
        // Check profile completion after login with delay
        console.log('🔍 Checking profile completion after login...');
        await checkProfileCompletion(false); // false = with 3s delay
      }
      return response;
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setPendingVerification(null);
    setProfileComplete(true);
    setShowProfileModal(false);
    setHasCheckedProfile(false); // Reset so next login can show modal again
  };

  // Complete profile function
  const completeProfile = async () => {
    setProfileComplete(true);
    setShowProfileModal(false);
    await checkProfileCompletion(true); // Refresh status without delay
  };

  const value = {
    currentUser,
    loading,
    error,
    pendingVerification,
    profileComplete,
    showProfileModal,
    sendOTP,
    verifyOTPAndCreateAccount,
    register,
    verifyOTP,
    login,
    logout,
    checkProfileCompletion,
    completeProfile,
    setShowProfileModal,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
