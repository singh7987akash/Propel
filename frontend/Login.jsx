import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

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
            await login(formData);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-20 left-40 w-96 h-96 bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-25 blur-3xl"></div>

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="text-white space-y-6 px-4 md:px-8">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-2">WELCOME</h1>
                        <p className="text-2xl md:text-3xl font-light opacity-90">TO PROPEL</p>
                    </div>
                    <p className="text-lg opacity-80 leading-relaxed max-w-md">
                        Empower dreams and bring ideas to life. Join our community of innovators,
                        creators, and supporters making meaningful impact through crowdfunding.
                    </p>
                    <p className="text-base opacity-70">
                        Whether you're launching your next big project or supporting causes you believe in,
                        Propel makes it simple, secure, and rewarding.
                    </p>
                </div>

                {/* Right Side - Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
                        <p className="text-gray-600 text-sm">
                            Don't have an account? {' '}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                Create now
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">E-mail</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                    placeholder="••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                                >
                                    {showPassword ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>


                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? {' '}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
