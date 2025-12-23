import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';

const CreateProject = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'technology',
        goalAmount: '',
        endDate: '',
        location: '',
        tags: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (parseFloat(formData.goalAmount) <= 0) {
            setError('Goal amount must be greater than 0');
            setLoading(false);
            return;
        }

        const endDate = new Date(formData.endDate);
        if (endDate <= new Date()) {
            setError('End date must be in the future');
            setLoading(false);
            return;
        }

        try {
            const projectData = {
                ...formData,
                goalAmount: parseFloat(formData.goalAmount),
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            const newProject = await projectService.createProject(projectData);
            navigate(`/projects/${newProject._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Check if user is creator or admin
    if (user?.role !== 'creator' && user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-4">You need a creator account to create projects.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Project</h1>
                    <p className="text-gray-600 mb-8">Share your vision and start raising funds</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label">Project Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input"
                                placeholder="Give your project a compelling title"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input"
                                rows="6"
                                placeholder="Describe your project in detail..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="technology">Technology</option>
                                    <option value="education">Education</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="environment">Environment</option>
                                    <option value="community">Community</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">Funding Goal ($) *</label>
                                <input
                                    type="number"
                                    name="goalAmount"
                                    value={formData.goalAmount}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="5000"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">End Date *</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="input"
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Tags (comma-separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="input"
                                placeholder="innovation, startup, tech"
                            />
                            <p className="text-xs text-gray-500 mt-1">Helps others discover your project</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Project...' : 'Create Project'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
