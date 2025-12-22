const express = require('express');
const router = express.Router();
const {
    getProjectComments,
    createComment,
    addReply,
    deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/project/:projectId', getProjectComments);

// Protected routes
router.post('/', protect, createComment);
router.post('/:id/reply', protect, addReply);
router.delete('/:id', protect, deleteComment);

module.exports = router;
