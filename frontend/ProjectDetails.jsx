import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { donationService } from '../services/donationService';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/common/ProgressBar';
import AddUpdateModal from '../components/common/AddUpdateModal';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [donationMessage, setDonationMessage] = useState('');
    const [donating, setDonating] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const data = await projectService.getProjectById(id);
            setProject(data);
        } catch (err) {
            setError('Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    const handleDonate = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        const donationAmountNum = parseFloat(donationAmount);
        const remainingGoal = project.goalAmount - project.currentAmount;

        if (donationAmountNum > remainingGoal) {
            alert(`Donation amount cannot exceed remaining goal amount ($${remainingGoal.toFixed(2)})`);
            return;
        }

        setDonating(true);
        try {
            // Create payment intent
            const { paymentIntentId } = await donationService.createPaymentIntent(
                parseFloat(donationAmount),
                project._id
            );

            // Confirm donation
            await donationService.confirmDonation({
                projectId: project._id,
                amount: parseFloat(donationAmount),
                paymentIntentId,
                message: donationMessage,
                anonymous: false
            });

            // Reset form
            setDonationAmount('');
            setDonationMessage('');
            setShowDonateModal(false);

            // Refresh project data to show updated progress
            await fetchProject();

            // Show success message
            alert('🎉 Thank you for your donation! The project progress has been updated.');
        } catch (err) {
            console.error('Donation error:', err);
            alert('❌ Donation failed. Please try again.');
        } finally {
            setDonating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error || 'Project not found'}</p>
            </div>
        );
    }

    const daysLeft = Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    const isCreator = user && project && user._id === project.creatorId._id;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Creator Header */}
                        <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl h-96 mb-6 overflow-hidden flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <span className="text-5xl font-bold text-primary-600">
                                    {project.creatorId?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 text-center">By {project.creatorId?.name}</h2>
                            {project.creatorId?.bio && (
                                <p className="text-gray-700 text-center mt-2 max-w-xs">{project.creatorId.bio}</p>
                            )}
                        </div>

                        {/* Title and Description */}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                        {project.category}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                                </div>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
                        </div>

                        {/* Updates Section */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">📣 Project Updates</h2>
                                {isCreator && (
                                    <button
                                        onClick={() => setShowUpdateModal(true)}
                                        className="btn btn-primary flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Post Update
                                    </button>
                                )}
                            </div>

                            {project.updates && project.updates.length > 0 ? (
                                <div className="space-y-4">
                                    {project.updates.slice().reverse().map((update, index) => (
                                        <div key={index} className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50 rounded-r-lg">
                                            <h3 className="font-semibold text-lg text-gray-900">{update.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <p className="text-gray-700 whitespace-pre-wrap">{update.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-3xl">📭</span>
                                    </div>
                                    <p className="text-gray-500 font-medium">No updates yet</p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {isCreator ? 'Share your progress with backers!' : 'Check back soon for project updates'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                            <ProgressBar current={project.currentAmount} goal={project.goalAmount} className="mb-6" />
                            <div className="text-center mb-6 p-3 bg-primary-50 rounded-lg">
                                <p className="text-2xl font-bold text-primary-600">${(project.goalAmount - project.currentAmount).toFixed(2)}</p>
                                <p className="text-sm text-gray-600">remaining to reach goal</p>
                            </div>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Backers</span>
                                    <span className="font-semibold">{project.donors?.length || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Days Left</span>
                                    <span className={`font-semibold ${daysLeft > 0 ? 'text-primary-600' : 'text-red-600'}`}>
                                        {daysLeft > 0 ? daysLeft : 'Ended'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-semibold">{project.location || 'N/A'}</span>
                                </div>
                            </div>

                            {daysLeft > 0 && project.status === 'active' && (
                                <button
                                    onClick={() => setShowDonateModal(true)}
                                    className="w-full btn btn-primary mb-4"
                                >
                                    Back This Project
                                </button>
                            )}

                            {/* Creator Info */}
                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Created by</h3>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-primary-700 font-medium">
                                            {project.creatorId?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{project.creatorId?.name}</p>
                                        <p className="text-sm text-gray-500">{project.creatorId?.bio || 'Creator'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Modal */}
            {showDonateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="label">Donation Amount ($)</label>
                                <p className="text-xs text-gray-500 mb-2">Max: ${(project.goalAmount - project.currentAmount).toFixed(2)}</p>
                                <input
                                    type="number"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    className="input"
                                    placeholder="50"
                                    min="1"
                                    max={project.goalAmount - project.currentAmount}
                                />
                            </div>
                            <div>
                                <label className="label">Message (Optional)</label>
                                <textarea
                                    value={donationMessage}
                                    onChange={(e) => setDonationMessage(e.target.value)}
                                    className="input"
                                    rows="3"
                                    placeholder="Leave a message of support..."
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDonate}
                                    disabled={donating}
                                    className="flex-1 btn btn-primary disabled:opacity-50"
                                >
                                    {donating ? 'Processing...' : 'Donate'}
                                </button>
                                <button
                                    onClick={() => setShowDonateModal(false)}
                                    className="flex-1 btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Update Modal */}
            <AddUpdateModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                projectId={id}
                onUpdateAdded={fetchProject}
            />
        </div>
    );
};

export default ProjectDetails;
