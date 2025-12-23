import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Propel Logo" className="h-16 w-auto drop-shadow-sm hover:drop-shadow-md transition-all" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-xl text-gray-700 hover:text-primary-900 transition">
                            <b>Home</b>
                        </Link>
                        <Link to="/projects" className="text-xl text-gray-700 hover:text-primary-900 transition">
                            <b>Projects</b>
                        </Link>
                        <Link to="/about" className="text-xl text-gray-700 hover:text-primary-900 transition">
                            <b>About Us</b>
                        </Link>
                        {isAuthenticated && (
                            <>
                                {(user?.role === 'creator' || user?.role === 'admin') && (
                                    <Link to="/create-project" className="text-xl text-gray-700 hover:text-primary-900 transition">
                                        <b>Create Project</b>
                                    </Link>
                                )}
                                <Link to="/dashboard" className="text-xl text-gray-700 hover:text-primary-900 transition">
                                    <b>Dashboard</b>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-primary-700 font-medium">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden md:block text-gray-700">{user?.name}</span>
                                </Link>
                                <button onClick={logout} className="btn btn-outline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
