import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { donationService } from '../services/donationService';
import ProjectCard from '../components/project/ProjectCard';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const { user } = useAuth();
    const [myProjects, setMyProjects] = useState([]);
    const [myDonations, setMyDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        if (!user) return;

        try {
            // Fetch user's donations
            const donations = await donationService.getUserDonations(user._id);
            setMyDonations(donations);

            // If user is a creator, fetch their projects
            if (user.role === 'creator' || user.role === 'admin') {
                const projects = await projectService.getProjects({ creatorId: user._id });
                setMyProjects(projects.filter(p => p.creatorId._id === user._id));
            }
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const totalDonated = myDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalRaised = myProjects.reduce((sum, p) => sum + p.currentAmount, 0);
    const activeProjects = myProjects.filter(p => p.status === 'active').length;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <div className="mb-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                    {/* Animated background blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Welcome back, {user?.name}! 👋</h1>
                            <p className="text-cyan-100 text-lg font-medium">
                                {user?.role === 'creator' ? '✨ Manage your campaigns and track progress' : '💫 Your impact and contribution summary'}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <img src={logo} alt="Propel Logo" className="h-40 w-auto drop-shadow-lg hover:drop-shadow-xl transition-all" />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 border-cyan-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-3xl drop-shadow-sm">💰</span>
                            </div>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1">
                            ${totalDonated.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Donated to Projects</div>
                        <div className="mt-3 flex items-center text-xs text-cyan-600 font-semibold">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            Making an impact
                        </div>
                    </div>

                    <div className="card p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-3xl drop-shadow-sm">📊</span>
                            </div>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Supported</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                            {myDonations.length}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Projects Backed</div>
                        <div className="mt-3 flex items-center text-xs text-purple-600 font-semibold">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            Community supporter
                        </div>
                    </div>

                    {(user.role === 'creator' || user.role === 'admin') && (
                        <div className="card p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-3xl drop-shadow-sm">🎯</span>
                                </div>
                                <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">Creator</span>
                            </div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">
                                ${totalRaised.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">{activeProjects} Active Campaign{activeProjects !== 1 ? 's' : ''}</div>
                            <div className="mt-3 flex items-center text-xs text-emerald-600 font-semibold">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Total earnings
                            </div>
                        </div>
                    )}
                </div>

                {/* Created Projects (for creators) */}
                {(user.role === 'creator' || user.role === 'admin') && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
                                <p className="text-gray-600 mt-1">Track and manage your fundraising projects</p>
                            </div>
                            <Link to="/create-project" className="btn btn-primary flex items-center gap-2">
                                <span className="text-xl">+</span>
                                Create New Campaign
                            </Link>
                        </div>

                        {myProjects.length === 0 ? (
                            <div className="card p-12 text-center">
                                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-5xl">🚀</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Start Your First Campaign</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Turn your ideas into reality. Create a crowdfunding campaign and bring your community together to support your vision.
                                </p>
                                <Link to="/create-project" className="btn btn-primary px-8 py-3 text-lg">
                                    Create Your First Project →
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myProjects.map((project) => (
                                    <ProjectCard key={project._id} project={project} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Donation History */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Contribution History</h2>
                        <p className="text-gray-600 mt-1">Your support makes a difference</p>
                    </div>

                    {myDonations.length === 0 ? (
                        <div className="card p-12 text-center">
                            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-5xl">❤️</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Support Amazing Projects</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Discover innovative projects and make a difference. Your contribution helps creators bring their ideas to life.
                            </p>
                            <Link to="/projects" className="btn btn-primary px-8 py-3 text-lg">
                                Explore Projects →
                            </Link>
                        </div>
                    ) : (
                        <div className="card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Project
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {myDonations.map((donation) => (
                                            <tr key={donation._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <Link
                                                        to={`/projects/${donation.projectId._id}`}
                                                        className="text-primary-600 hover:underline font-medium"
                                                    >
                                                        {donation.projectId.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-900">
                                                    ${donation.amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(donation.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${donation.status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : donation.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {donation.status === 'completed' ? '✓ Completed' : donation.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        to={`/projects/${donation.projectId._id}`}
                                                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                    >
                                                        View Project →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
