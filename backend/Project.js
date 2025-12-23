const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a project description']
    },
    category: {
        type: String,
        enum: ['education', 'healthcare', 'environment', 'community', 'technology'],
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalAmount: {
        type: Number,
        required: [true, 'Please provide a goal amount'],
        min: 0
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    images: [String],
    videoUrl: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'funded', 'closed', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    donors: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: Number,
        date: {
            type: Date,
            default: Date.now
        },
        anonymous: {
            type: Boolean,
            default: false
        }
    }],
    updates: [{
        title: String,
        content: String,
        date: {
            type: Date,
            default: Date.now
        },
        images: [String]
    }],
    milestones: [{
        title: String,
        description: String,
        targetAmount: Number,
        achieved: {
            type: Boolean,
            default: false
        }
    }],
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', projectSchema);
