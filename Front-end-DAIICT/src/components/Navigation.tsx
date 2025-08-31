import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, ArrowLeft, Droplets, Menu, X, LogOut, User, Wallet } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useToast } from '@/components/ui/use-toast';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useWeb3 } from '@/contexts/Web3Context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface FormData {
  firstName: string;
  lastName: string;
  countryCode: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  role: string;
}

interface FormErrors {
  [key: string]: string;
}

const Navigation = () => {
  const { currentUser, login, sendOTP, verifyOTPAndCreateAccount, logout, loading, error: authError, pendingVerification } = useAuth();
  const { isConnected, account, connectWallet, isDemoMode } = useWeb3();
  const { toast } = useToast();
  
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [signupStep, setSignupStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    lastName: '',
    countryCode: '+91',
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    role: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.contact) newErrors.contact = 'Contact is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      setLoginOpen(false);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegistration = async () => {
    if (!validateStep1()) return;

    setIsSubmitting(true);
    try {
      await sendOTP({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        role: formData.role
      });
      
      setSignupStep(2);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyOTPAndCreateAccount(formData.otp);
      setSignupOpen(false);
      setSignupStep(1);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      });
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Logo */}
          <Logo size="md" variant="default" logoStyle="modern" />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {currentUser ? (
              <>
                <a href="#dashboard" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="#blockchain" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Blockchain
                </a>
                <a href="#smart-contracts" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Smart Contracts
                </a>
                <a href="#impact" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Impact
                </a>
                <a href="#security" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Security
                </a>
              </>
            ) : (
              <>
                <a href="#home" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="#blockchain" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Blockchain
                </a>
                <a href="#smart-contracts" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Smart Contracts
                </a>
                <a href="#impact" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Impact
                </a>
                <a href="#security" className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Security
                </a>
              </>
            )}
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted">
                  <User className="h-4 w-4 text-primary-green" />
                  <span className="text-sm font-medium">{currentUser.fullName?.split(' ')[0] || 'User'}</span>
                </div>
                {isConnected && (
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-green/10 border border-primary-green/20">
                    <Wallet className="h-4 w-4 text-primary-green" />
                    <span className="text-sm font-medium text-primary-green">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                      {isDemoMode && <span className="ml-1 text-xs bg-yellow-500 text-black px-1 rounded">(Demo)</span>}
                    </span>
                  </div>
                )}
                {!isConnected && (
                  <Button variant="outline" size="sm" onClick={connectWallet}>
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet {/* Will auto-enable demo mode if MetaMask not available */}
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
                <Button size="sm" onClick={() => setSignupOpen(true)}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center pb-4 border-b">
                    <Logo size="sm" />
                  </div>
                  
                  <div className="flex-1 py-6">
                    <nav className="space-y-4">
                      {currentUser ? (
                        <>
                          <SheetClose asChild>
                            <a href="#dashboard" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <User className="h-5 w-5" />
                              <span>Dashboard</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#blockchain" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Wallet className="h-5 w-5" />
                              <span>Blockchain</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#smart-contracts" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Shield className="h-5 w-5" />
                              <span>Smart Contracts</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#impact" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <ArrowRight className="h-5 w-5" />
                              <span>Impact</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#security" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Shield className="h-5 w-5" />
                              <span>Security</span>
                            </a>
                          </SheetClose>
                        </>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <a href="#home" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Droplets className="h-5 w-5" />
                              <span>Home</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#blockchain" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Wallet className="h-5 w-5" />
                              <span>Blockchain</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#smart-contracts" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Shield className="h-5 w-5" />
                              <span>Smart Contracts</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#impact" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <ArrowRight className="h-5 w-5" />
                              <span>Impact</span>
                            </a>
                          </SheetClose>
                          <SheetClose asChild>
                            <a href="#security" className="flex items-center space-x-3 text-white hover:text-primary-green p-3 rounded-lg hover:bg-primary-green/10 transition-colors">
                              <Shield className="h-5 w-5" />
                              <span>Security</span>
                            </a>
                          </SheetClose>
                        </>
                      )}
                    </nav>
                  </div>

                  <div className="border-t pt-6">
                    {currentUser ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="h-8 w-8 bg-primary-green text-white rounded-full p-1" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {currentUser.fullName || currentUser.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              {currentUser.role}
                            </div>
                          </div>
                        </div>
                        
                        {/* Mobile Wallet Connection */}
                        {isConnected ? (
                          <div className="flex items-center space-x-3 p-3 bg-primary-green/10 rounded-lg border border-primary-green/20">
                            <Wallet className="h-6 w-6 text-primary-green" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-primary-green truncate">
                                {account?.slice(0, 6)}...{account?.slice(-4)}
                                {isDemoMode && <span className="ml-2 text-xs bg-yellow-500 text-black px-1 rounded">(Demo)</span>}
                              </div>
                              <div className="text-xs text-primary-green/70">
                                Wallet Connected
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Button onClick={connectWallet} variant="outline" className="w-full flex items-center justify-center space-x-2">
                            <Wallet className="h-4 w-4" />
                            <span>Connect Wallet</span>
                          </Button>
                        )}
                        
                        <Button 
                          onClick={handleLogout} 
                          variant="destructive" 
                          className="w-full flex items-center justify-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full" onClick={() => setLoginOpen(true)}>
                          Login
                        </Button>
                        <Button className="w-full" onClick={() => setSignupOpen(true)}>
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-foreground">
              Welcome Back to <span className="text-primary-green">HydroChain</span>
            </DialogTitle>
          </DialogHeader>
          
          <Card className="simple-card p-4 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-foreground">Email Address</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-foreground">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <Button
                className="w-full btn-primary font-medium"
                onClick={handleLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  className="text-primary-green hover:text-primary-blue transition-colors duration-200 font-medium"
                  onClick={() => {
                    setLoginOpen(false);
                    setSignupOpen(true);
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-foreground">
              Join <span className="text-primary-green">HydroChain</span> Platform
            </DialogTitle>
          </DialogHeader>
          
          <Card className="simple-card p-4 sm:p-6">
            {signupStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium text-foreground">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Enter your contact number"
                    className="w-full"
                  />
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                
                <div className="space-y-4">
                  <Label>Select Role</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="producer" id="producer" />
                      <Label htmlFor="producer">Producer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">Bank</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auditor" id="auditor" />
                      <Label htmlFor="auditor">Auditor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="government" id="government" />
                      <Label htmlFor="government">Government</Label>
                    </div>
                  </RadioGroup>
                  {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>
              </div>
            )}

            {signupStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">Enter the verification code sent to your email</p>
                  <p className="text-sm text-muted-foreground">Email: {formData.email}</p>
                  <div className="text-xs text-muted-foreground">
                    Check your email for a 6-digit verification code
                  </div>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={formData.otp} onChange={(value) => handleInputChange('otp', value)}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                  {pendingVerification && (
                    <div className="text-xs text-green-600">
                      OTP sent to: {pendingVerification.email}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-4 mt-6">
              {signupStep === 2 ? (
                <Button
                  className="w-full btn-primary font-medium"
                  onClick={handleOTPVerification}
                  disabled={isSubmitting || !formData.otp || formData.otp.length !== 6}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </Button>
              ) : (
                <Button
                  className="w-full btn-primary font-medium"
                  onClick={handleRegistration}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              {signupStep === 1 && (
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    className="text-primary-green hover:text-primary-blue transition-colors duration-200 font-medium"
                    onClick={() => {
                      setSignupOpen(false);
                      setLoginOpen(true);
                    }}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navigation;
