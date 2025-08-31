const db = require('../config/db');

const profileController = {
  // Check if user has completed their role-specific profile
  async checkProfileCompletion(req, res) {
    try {
      const userId = req.user.id;
      const userRole = req.user.role;
      
      let isComplete = false;
      let profileData = null;
      
      switch (userRole) {
        case 'government':
          const govResult = await db.query(
            'SELECT * FROM government_details WHERE user_id = $1',
            [userId]
          );
          isComplete = govResult.rows.length > 0;
          profileData = govResult.rows[0] || null;
          break;
          
        case 'producer':
          const producerResult = await db.query(
            'SELECT * FROM producer_details WHERE user_id = $1',
            [userId]
          );
          isComplete = producerResult.rows.length > 0;
          profileData = producerResult.rows[0] || null;
          break;
          
        case 'auditor':
          const auditorResult = await db.query(
            'SELECT * FROM auditor_details WHERE user_id = $1',
            [userId]
          );
          isComplete = auditorResult.rows.length > 0;
          profileData = auditorResult.rows[0] || null;
          break;
          
        case 'bank':
          const bankResult = await db.query(
            'SELECT * FROM bank_details WHERE user_id = $1',
            [userId]
          );
          isComplete = bankResult.rows.length > 0;
          profileData = bankResult.rows[0] || null;
          break;
          
        default:
          isComplete = true;
      }
      
      res.status(200).json({
        success: true,
        isComplete,
        role: userRole,
        profileData
      });
    } catch (err) {
      console.error('Check profile completion error:', err);
      res.status(500).json({ message: 'Server error while checking profile completion' });
    }
  },

  // Complete government profile
  async completeGovernmentProfile(req, res) {
    try {
      const userId = req.user.id;
      const { department, designation, bankAccount, walletAddress, ifscCode } = req.body;
      
      // Validate required fields
      if (!department || !designation || !bankAccount || !ifscCode) {
        return res.status(400).json({ 
          message: 'Department, designation, bank account, and IFSC code are required' 
        });
      }
      
      // Validate IFSC code format (basic validation)
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(ifscCode)) {
        return res.status(400).json({ 
          message: 'Invalid IFSC code format' 
        });
      }
      
      // Check if profile already exists
      const existingProfile = await db.query(
        'SELECT * FROM government_details WHERE user_id = $1',
        [userId]
      );
      
      if (existingProfile.rows.length > 0) {
        return res.status(400).json({ 
          message: 'Government profile already completed' 
        });
      }
      
      // Insert government details
      const result = await db.query(
        `INSERT INTO government_details 
         (user_id, department, designation, bank_account, wallet_address, ifsc_code) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [userId, department, designation, bankAccount, walletAddress || null, ifscCode]
      );
      
      res.status(201).json({
        success: true,
        message: 'Government profile completed successfully',
        profileData: result.rows[0]
      });
      
    } catch (err) {
      console.error('Complete government profile error:', err);
      res.status(500).json({ message: 'Server error while completing profile' });
    }
  },

  // Update government profile
  async updateGovernmentProfile(req, res) {
    try {
      const userId = req.user.id;
      const { department, designation, bankAccount, walletAddress, ifscCode } = req.body;
      
      // Validate required fields
      if (!department || !designation || !bankAccount || !ifscCode) {
        return res.status(400).json({ 
          message: 'Department, designation, bank account, and IFSC code are required' 
        });
      }
      
      // Validate IFSC code format
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(ifscCode)) {
        return res.status(400).json({ 
          message: 'Invalid IFSC code format' 
        });
      }
      
      // Update government details
      const result = await db.query(
        `UPDATE government_details 
         SET department = $2, designation = $3, bank_account = $4, 
             wallet_address = $5, ifsc_code = $6, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $1 
         RETURNING *`,
        [userId, department, designation, bankAccount, walletAddress || null, ifscCode]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          message: 'Government profile not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Government profile updated successfully',
        profileData: result.rows[0]
      });
      
    } catch (err) {
      console.error('Update government profile error:', err);
      res.status(500).json({ message: 'Server error while updating profile' });
    }
  },

  // Complete producer profile
  async completeProducerProfile(req, res) {
    try {
      const userId = req.user.id;
      const { organizationName, organizationId, walletAddress, bankAccount, ifscCode, kycDocumentUrl } = req.body;
      
      // Validate required fields
      if (!organizationName || !organizationId || !walletAddress || !bankAccount || !ifscCode) {
        return res.status(400).json({ 
          message: 'Organization name, organization ID, wallet address, bank account, and IFSC code are required' 
        });
      }
      
      // Validate IFSC code format
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(ifscCode)) {
        return res.status(400).json({ 
          message: 'Invalid IFSC code format' 
        });
      }
      
      // Insert producer details
      const result = await db.query(
        `INSERT INTO producer_details 
         (user_id, organization_name, organization_id, wallet_address, bank_account, ifsc_code, kyc_document_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [userId, organizationName, organizationId, walletAddress, bankAccount, ifscCode, kycDocumentUrl || null]
      );
      
      res.status(201).json({
        success: true,
        message: 'Producer profile completed successfully',
        profileData: result.rows[0]
      });
      
    } catch (err) {
      console.error('Complete producer profile error:', err);
      res.status(500).json({ message: 'Server error while completing profile' });
    }
  },

  // Complete auditor profile
  async completeAuditorProfile(req, res) {
    try {
      const userId = req.user.id;
      const { organizationName, licenseNo, designation } = req.body;
      
      // Validate required fields
      if (!organizationName || !licenseNo) {
        return res.status(400).json({ 
          message: 'Organization name and license number are required' 
        });
      }
      
      // Insert auditor details
      const result = await db.query(
        `INSERT INTO auditor_details 
         (user_id, organization_name, license_no, designation) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [userId, organizationName, licenseNo, designation || null]
      );
      
      res.status(201).json({
        success: true,
        message: 'Auditor profile completed successfully',
        profileData: result.rows[0]
      });
      
    } catch (err) {
      console.error('Complete auditor profile error:', err);
      res.status(500).json({ message: 'Server error while completing profile' });
    }
  },

  // Complete bank profile
  async completeBankProfile(req, res) {
    try {
      const userId = req.user.id;
      const { bankName, branchName, ifscCode } = req.body;
      
      // Validate required fields
      if (!bankName || !branchName || !ifscCode) {
        return res.status(400).json({ 
          message: 'Bank name, branch name, and IFSC code are required' 
        });
      }
      
      // Validate IFSC code format
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(ifscCode)) {
        return res.status(400).json({ 
          message: 'Invalid IFSC code format' 
        });
      }
      
      // Insert bank details
      const result = await db.query(
        `INSERT INTO bank_details 
         (user_id, bank_name, branch_name, ifsc_code) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [userId, bankName, branchName, ifscCode]
      );
      
      res.status(201).json({
        success: true,
        message: 'Bank profile completed successfully',
        profileData: result.rows[0]
      });
      
    } catch (err) {
      console.error('Complete bank profile error:', err);
      res.status(500).json({ message: 'Server error while completing profile' });
    }
  }
};

module.exports = profileController;
