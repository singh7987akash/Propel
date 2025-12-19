import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [donations, setDonations] = useState([]);
    const [donationAmount, setDonationAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProject();
        fetchDonations();
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/projects/${id}`);
            setProject(data);
        } catch (err) {
            setError('Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    const fetchDonations = async () => {
        try {
            const { data } = await api.get(`/donations/project/${id}`);
            setDonations(data);
        } catch (err) {
            console.error('Failed to load donations');
        }
    };

    const handleDonate = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/donations', {
                projectId: id,
                amount: Number(donationAmount),
                message
            });

            setDonationAmount('');
            setMessage('');
            fetchProject();
            fetchDonations();
            alert('Thank you for your donation!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to process donation');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!project) return <div className="error">Project not found</div>;

    const progress = (project.currentAmount / project.goalAmount) * 100;
    const daysLeft = Math.ceil(
        (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="project-details-page">
            <div className="container">
                <div className="project-layout">
                    <div className="project-main">
                        <img src={project.image} alt={project.title} className="project-hero-image" />

                        <div className="project-info">
                            <div className="category-badge">{project.category}</div>
                            <h1>{project.title}</h1>
                            <p className="creator-info">
                                Created by <strong>{project.creator?.username}</strong>
                            </p>
                        </div>

                        <div className="project-description">
                            <h2>About This Project</h2>
                            <p>{project.description}</p>
                        </div>

                        {donations.length > 0 && (
                            <div className="donations-section">
                                <h2>Recent Supporters ({donations.length})</h2>
                                <div className="donations-list">
                                    {donations.slice(0, 10).map((donation) => (
                                        <div key={donation._id} className="donation-item">
                                            <div className="donation-header">
                                                <strong>{donation.donor?.username}</strong>
                                                <span className="donation-amount">${donation.amount}</span>
                                            </div>
                                            {donation.message && (
                                                <p className="donation-message">{donation.message}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="project-sidebar">
                        <div className="funding-card card">
                            <div className="funding-stats">
                                <div className="stat-large">
                                    <span className="amount">${project.currentAmount.toLocaleString()}</span>
                                    <span className="label">raised of ${project.goalAmount.toLocaleString()}</span>
                                </div>

                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>

                                <div className="stats-row">
                                    <div className="stat">
                                        <strong>{progress.toFixed(0)}%</strong>
                                        <span>funded</span>
                                    </div>
                                    <div className="stat">
                                        <strong>{donations.length}</strong>
                                        <span>backers</span>
                                    </div>
                                    <div className="stat">
                                        <strong>{daysLeft}</strong>
                                        <span>days left</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleDonate} className="donation-form">
                                <h3>Support This Project</h3>

                                <div className="form-group">
                                    <label className="form-label">Donation Amount ($)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="50"
                                        min="1"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message (Optional)</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Share your support..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows="3"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    Donate Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
