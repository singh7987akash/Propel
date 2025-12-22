const Donation = require('../models/Donation');
const Project = require('../models/Project');
const User = require('../models/User');
const { createPaymentIntent, confirmPayment } = require('../utils/paymentService');
const { sendDonationEmail } = require('../utils/emailService');

// @desc    Create payment intent
// @route   POST /api/donations/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, projectId } = req.body;

        // Verify project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Create payment intent (mock for now)
        const paymentIntent = await createPaymentIntent(amount * 100, project.currency); // Convert to cents

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating payment intent' });
    }
};

// @desc    Confirm donation
// @route   POST /api/donations/confirm
// @access  Private
exports.confirmDonation = async (req, res) => {
    try {
        const { projectId, amount, paymentIntentId, anonymous, message } = req.body;

        // Verify project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Confirm payment (mock for now)
        const paymentConfirmation = await confirmPayment(paymentIntentId);

        // Create donation record
        const donation = await Donation.create({
            projectId,
            donorId: req.user._id,
            amount,
            paymentIntentId,
            status: 'completed',
            anonymous: anonymous || false,
            message: message || ''
        });

        // Update project
        project.currentAmount += amount;
        project.donors.push({
            userId: req.user._id,
            amount,
            date: Date.now(),
            anonymous: anonymous || false
        });

        // Check if project reached goal
        if (project.currentAmount >= project.goalAmount && project.status === 'active') {
            project.status = 'funded';
        }

        await project.save();

        // Update user's donation history
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                donationHistory: {
                    projectId,
                    amount,
                    date: Date.now()
                }
            }
        });

        // Send confirmation email
        sendDonationEmail(req.user.email, project.title, amount);

        res.status(201).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error confirming donation' });
    }
};

// @desc    Get user's donations
// @route   GET /api/donations/user/:userId
// @access  Private
exports.getUserDonations = async (req, res) => {
    try {
        // Ensure user can only see their own donations (unless admin)
        if (req.user._id.toString() !== req.params.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const donations = await Donation.find({ donorId: req.params.userId })
            .populate('projectId', 'title images category')
            .sort({ createdAt: -1 });

        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching donations' });
    }
};

// @desc    Get project donations
// @route   GET /api/donations/project/:projectId
// @access  Public
exports.getProjectDonations = async (req, res) => {
    try {
        const donations = await Donation.find({
            projectId: req.params.projectId,
            status: 'completed'
        })
            .populate('donorId', 'name profileImage')
            .sort({ createdAt: -1 });

        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching project donations' });
    }
};
