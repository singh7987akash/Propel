import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import './Dashboard.css';

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [myProjects, setMyProjects] = useState([]);
    const [myDonations, setMyDonations] = useState([]);
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [isAuthenticated]);

    const fetchData = async () => {
        try {
            const [projectsRes, donationsRes] = await Promise.all([
                api.get('/projects/my/projects'),
                api.get('/donations/my/donations')
            ]);

            setMyProjects(projectsRes.data);
            setMyDonations(donationsRes.data);
        } catch (err) {
            console.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    const totalRaised = myProjects.reduce((sum, p) => sum + p.currentAmount, 0);
    const totalDonated = myDonations.reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h1>My Dashboard</h1>
                    <p>Manage your projects and track your contributions</p>
                </div>

                <div className="stats-overview">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <div className="stat-value">{myProjects.length}</div>
                            <div className="stat-label">My Projects</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">💵</div>
                        <div className="stat-content">
                            <div className="stat-value">${totalRaised.toLocaleString()}</div>
                            <div className="stat-label">Total Raised</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">❤️</div>
                        <div className="stat-content">
                            <div className="stat-value">{myDonations.length}</div>
                            <div className="stat-label">Projects Supported</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎁</div>
                        <div className="stat-content">
                            <div className="stat-value">${totalDonated.toLocaleString()}</div>
                            <div className="stat-label">Total Donated</div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        My Projects
                    </button>
                    <button
                        className={`tab ${activeTab === 'donations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('donations')}
                    >
                        My Donations
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'projects' ? (
                        <div className="projects-tab">
                            {myProjects.length === 0 ? (
                                <div className="empty-state">
                                    <p>You haven't created any projects yet.</p>
                                    <a href="/create" className="btn btn-primary">
                                        Create Your First Project
                                    </a>
                                </div>
                            ) : (
                                <div className="grid grid-3">
                                    {myProjects.map((project) => (
                                        <ProjectCard key={project._id} project={project} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="donations-tab">
                            {myDonations.length === 0 ? (
                                <div className="empty-state">
                                    <p>You haven't made any donations yet.</p>
                                    <a href="/" className="btn btn-primary">
                                        Explore Projects
                                    </a>
                                </div>
                            ) : (
                                <div className="donations-grid">
                                    {myDonations.map((donation) => (
                                        <div key={donation._id} className="donation-card">
                                            <img
                                                src={donation.project?.image}
                                                alt={donation.project?.title}
                                                className="donation-image"
                                            />
                                            <div className="donation-details">
                                                <h3>{donation.project?.title}</h3>
                                                <div className="donation-info">
                                                    <span className="donation-amount">${donation.amount}</span>
                                                    <span className="donation-date">
                                                        {new Date(donation.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {donation.message && (
                                                    <p className="donation-message">"{donation.message}"</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
