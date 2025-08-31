const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// @route   GET /api/profile/check-completion
// @desc    Check if user has completed their role-specific profile
// @access  Private
router.get('/check-completion', auth, profileController.checkProfileCompletion);

// @route   POST /api/profile/government
// @desc    Complete government profile
// @access  Private (Government role only)
router.post('/government', auth, profileController.completeGovernmentProfile);

// @route   PUT /api/profile/government
// @desc    Update government profile
// @access  Private (Government role only)
router.put('/government', auth, profileController.updateGovernmentProfile);

// @route   POST /api/profile/producer
// @desc    Complete producer profile
// @access  Private (Producer role only)
router.post('/producer', auth, profileController.completeProducerProfile);

// @route   POST /api/profile/auditor
// @desc    Complete auditor profile
// @access  Private (Auditor role only)
router.post('/auditor', auth, profileController.completeAuditorProfile);

// @route   POST /api/profile/bank
// @desc    Complete bank profile
// @access  Private (Bank role only)
router.post('/bank', auth, profileController.completeBankProfile);

module.exports = router;
