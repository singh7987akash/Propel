import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreateProject.css';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Education',
        goalAmount: '',
        image: '',
        deadline: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

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

        try {
            await api.post('/projects', {
                ...formData,
                goalAmount: Number(formData.goalAmount)
            });

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-project-page">
            <div className="container-narrow">
                <div className="page-header">
                    <h1>Create a Meaningful Project</h1>
                    <p className="header-subtitle">
                        Create a meaningful project by sharing a clear title, a strong description, and a compelling story that explains the problem you're solving and who will benefit from your work.
                    </p>
                </div>

                <div className="guidance-card">
                    <h3>📋 Project Guidelines</h3>
                    <p>
                        Add important details such as how the funds will be used, your project timeline, and a representative image to help supporters trust your mission. Provide accurate and transparent information so people can understand your cause and confidently support your fundraising journey.
                    </p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-group">
                        <label className="form-label">
                            Project Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="Give your project a clear and compelling title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <p className="field-hint">
                            💡 Make it specific and engaging. Example: "Clean Water for 500 Families in Rural Kenya"
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Project Story & Description <span className="required">*</span>
                        </label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Tell your compelling story here...

• What problem are you solving?
• Who will benefit from this project?
• How will the funds be used?
• What is your timeline?
• Why should people trust and support your mission?"
                            value={formData.description}
                            onChange={handleChange}
                            rows="10"
                            required
                        />
                        <p className="field-hint">
                            💡 Be specific, honest, and transparent. Share the impact your project will have and explain exactly how donations will be used.
                        </p>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Category <span className="required">*</span>
                            </label>
                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="Education">📚 Education</option>
                                <option value="Healthcare">🏥 Healthcare</option>
                                <option value="Environment">🌱 Environment</option>
                                <option value="Community">🤝 Community</option>
                                <option value="Technology">💻 Technology</option>
                                <option value="Other">🎯 Other</option>
                            </select>
                            <p className="field-hint">
                                Choose the category that best fits your cause
                            </p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Funding Goal ($) <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                name="goalAmount"
                                className="form-input"
                                placeholder="10000"
                                min="1"
                                value={formData.goalAmount}
                                onChange={handleChange}
                                required
                            />
                            <p className="field-hint">
                                Set a realistic goal based on your actual needs
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Project Image URL <span className="optional">(Optional)</span>
                        </label>
                        <input
                            type="url"
                            name="image"
                            className="form-input"
                            placeholder="https://example.com/your-project-image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <p className="field-hint">
                            📸 Add a representative image to help supporters visualize your project and build trust. Use a high-quality photo that shows your cause.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Campaign Deadline <span className="required">*</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            className="form-input"
                            value={formData.deadline}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                        <p className="field-hint">
                            ⏰ Set a realistic timeline for your fundraising campaign
                        </p>
                    </div>

                    <div className="trust-reminder">
                        <h4>✅ Before You Submit</h4>
                        <ul>
                            <li>✓ Your title is clear and specific</li>
                            <li>✓ Your story explains the problem and solution</li>
                            <li>✓ You've detailed how funds will be used</li>
                            <li>✓ Your timeline is realistic</li>
                            <li>✓ All information is accurate and transparent</li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Creating Project...' : 'Launch Your Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
