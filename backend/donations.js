const express = require('express');
const router = express.Router();
const {
    createPaymentIntent,
    confirmDonation,
    getUserDonations,
    getProjectDonations
} = require('../controllers/donationController');
const { protect } = require('../middleware/auth');
const { donationValidation, validate } = require('../middleware/validation');

// Protected routes
router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/confirm', protect, donationValidation, validate, confirmDonation);
router.get('/user/:userId', protect, getUserDonations);

// Public route
router.get('/project/:projectId', getProjectDonations);

module.exports = router;
