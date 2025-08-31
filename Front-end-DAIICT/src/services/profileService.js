const API_URL = 'http://localhost:5000/api';

const profileService = {
  // Check if profile is complete
  async checkProfileCompletion() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/check-completion`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to check profile completion');
      }

      return data;
    } catch (error) {
      console.error('Check profile completion error:', error);
      throw error;
    }
  },

  // Complete government profile
  async completeGovernmentProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/government`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete profile');
      }

      return data;
    } catch (error) {
      console.error('Complete government profile error:', error);
      throw error;
    }
  },

  // Update government profile
  async updateGovernmentProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/government`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update government profile error:', error);
      throw error;
    }
  },

  // Complete producer profile
  async completeProducerProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/producer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete producer profile');
      }

      return data;
    } catch (error) {
      console.error('Complete producer profile error:', error);
      throw error;
    }
  },

  // Complete auditor profile
  async completeAuditorProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/auditor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete auditor profile');
      }

      return data;
    } catch (error) {
      console.error('Complete auditor profile error:', error);
      throw error;
    }
  },

  // Complete bank profile
  async completeBankProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/profile/bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete bank profile');
      }

      return data;
    } catch (error) {
      console.error('Complete bank profile error:', error);
      throw error;
    }
  }
};

export default profileService;
