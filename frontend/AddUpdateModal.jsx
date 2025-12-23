import { useState } from 'react';
import { projectService } from '../../services/projectService';

const AddUpdateModal = ({ isOpen, onClose, projectId, onUpdateAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError('Please provide both title and content');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await projectService.addProjectUpdate(projectId, {
                title: title.trim(),
                content: content.trim(),
                images: []
            });

            // Reset form
            setTitle('');
            setContent('');

            // Notify parent and close
            if (onUpdateAdded) {
                onUpdateAdded();
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add update. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!submitting) {
            setTitle('');
            setContent('');
            setError('');
            onClose();
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 modal-overlay"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">📢 Post Update</h3>
                                <p className="text-emerald-100 text-sm">Keep your backers informed about your progress</p>
                            </div>
                            <button
                                onClick={handleClose}
                                disabled={submitting}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all disabled:opacity-50"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Title Input */}
                            <div>
                                <label className="label">Update Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Milestone Reached: 50% Funded!"
                                    className="input"
                                    disabled={submitting}
                                    maxLength={100}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
                            </div>

                            {/* Content Textarea */}
                            <div>
                                <label className="label">Update Content *</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Share details about your progress, achievements, challenges, or next steps..."
                                    className="input"
                                    rows="8"
                                    disabled={submitting}
                                    maxLength={2000}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">{content.length}/2000 characters</p>
                            </div>

                            {/* Helper Text */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <h4 className="font-semibold text-blue-900 text-sm mb-2">💡 Tips for Great Updates:</h4>
                                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                    <li>Share specific achievements and milestones</li>
                                    <li>Be transparent about challenges and how you're addressing them</li>
                                    <li>Thank your backers for their support</li>
                                    <li>Include next steps and timeline updates</li>
                                </ul>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                type="submit"
                                disabled={submitting || !title.trim() || !content.trim()}
                                className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Post Update
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={submitting}
                                className="flex-1 btn btn-secondary disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddUpdateModal;
