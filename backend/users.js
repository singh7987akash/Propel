const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    getUserProjects
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/:id', getUserProfile);
router.get('/:id/projects', getUserProjects);

// Protected routes
router.put('/:id', protect, updateUserProfile);

module.exports = router;
