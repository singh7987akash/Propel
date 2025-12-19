import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        {
            title: 'Clean Water',
            description: 'Donation for Clean Water to the People\'s',
            icon: '💧',
            color: 'rgba(59, 130, 246, 0.1)'
        },
        {
            title: 'Education',
            description: 'Donating to support education for children',
            icon: '📚',
            color: 'rgba(245, 158, 11, 0.1)'
        },
        {
            title: 'Healthy Food',
            description: 'Donation for Healthy Food to Children',
            icon: '🍎',
            color: 'rgba(239, 68, 68, 0.1)'
        }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <span className="hero-badge">Non profit Charity Foundation</span>
                        <h1 className="hero-title">
                            Raise Your
                            <br />
                            Helping Hand
                        </h1>
                        <p className="hero-description">
                            Fundraise organizations can provide medical treatments & essential
                            support to those who cannot afford improving overall.
                        </p>
                        <div className="hero-actions">
                            <a href="/create" className="btn btn-lg btn-primary">
                                Donate Causes
                            </a>
                            <a href="#about" className="btn btn-lg btn-secondary">
                                Become a Volunteer
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <div key={index} className="category-card" style={{ backgroundColor: category.color }}>
                                <div className="category-icon">{category.icon}</div>
                                <div className="category-content">
                                    <span className="category-label">{category.title}</span>
                                    <h3 className="category-title">{category.description}</h3>
                                    <a href="#projects" className="category-link">
                                        Read more →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-images">
                            <div className="about-image-main">
                                <div className="image-placeholder">
                                    <span>📸</span>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <span className="section-badge">About AidVerse</span>
                            <h2 className="section-title">
                                Helping is Great Virtue for Every Human's
                            </h2>
                            <p className="section-description">
                                This team understand though fundraising can be hard, we help and
                                that introduce authentically meets our standards, and that we think is doing
                                crucial work, we display the causes. Interestingly, if we seen hand out
                                others, transmitting cultures, religions, and several backdrops.
                            </p>
                            <div className="about-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Education</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Water</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Medical Health</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Education</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Clean Water</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Charity For Others</span>
                                </div>
                            </div>
                            <a href="#projects" className="btn btn-lg btn-primary">
                                Learn More Us →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📅</div>
                            <div className="stat-number">35+</div>
                            <div className="stat-text">Years of Foundation</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-number">68+</div>
                            <div className="stat-text">Monthly Donate</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🤝</div>
                            <div className="stat-number">8k+</div>
                            <div className="stat-text">Global Partners</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-number">93+</div>
                            <div className="stat-text">Project Complete</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-section" id="projects">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Popular Causes</span>
                        <h2>Give Donations For Latest Causes</h2>
                        <p>Support initiatives that are making a real difference</p>
                    </div>

                    {loading ? (
                        <div className="loading">Loading projects...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : projects.length === 0 ? (
                        <div className="empty-state">
                            <p>No projects yet. Be the first to create one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {projects.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
