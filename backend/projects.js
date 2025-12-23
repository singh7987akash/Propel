const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addProjectUpdate
} = require('../controllers/projectController');
const { protect, authorizeCreator } = require('../middleware/auth');
const { projectValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', protect, authorizeCreator, projectValidation, validate, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/updates', protect, addProjectUpdate);

module.exports = router;
