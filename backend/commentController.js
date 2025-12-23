const Comment = require('../models/Comment');
const Project = require('../models/Project');

// @desc    Get comments for a project
// @route   GET /api/comments/project/:projectId
// @access  Public
exports.getProjectComments = async (req, res) => {
    try {
        const comments = await Comment.find({ projectId: req.params.projectId })
            .populate('userId', 'name profileImage')
            .populate('replies.userId', 'name profileImage')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching comments' });
    }
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
exports.createComment = async (req, res) => {
    try {
        const { projectId, content } = req.body;

        // Verify project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const comment = await Comment.create({
            projectId,
            userId: req.user._id,
            content
        });

        // Populate user info before sending response
        await comment.populate('userId', 'name profileImage');

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating comment' });
    }
};

// @desc    Add reply to comment
// @route   POST /api/comments/:id/reply
// @access  Private
exports.addReply = async (req, res) => {
    try {
        const { content } = req.body;

        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.replies.push({
            userId: req.user._id,
            content,
            createdAt: Date.now()
        });

        await comment.save();
        await comment.populate('replies.userId', 'name profileImage');

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error adding reply' });
    }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user owns the comment or is admin
        if (comment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting comment' });
    }
};
