import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    const categories = [
        { name: 'Technology', icon: '💻', color: 'from-indigo-500 to-blue-600' },
        { name: 'Education', icon: '📚', color: 'from-emerald-500 to-teal-600' },
        { name: 'Healthcare', icon: '🏥', color: 'from-rose-500 to-pink-600' },
        { name: 'Environment', icon: '🌱', color: 'from-lime-500 to-green-600' },
        { name: 'Community', icon: '🤝', color: 'from-violet-500 to-purple-600' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-block mb-4">
                                <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-400 border-opacity-30">
                                    🚀 Trusted by 50,000+ supporters
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                                Fund Your Dreams,<br />Transform Lives
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed">
                                Join thousands of creators and supporters making ideas a reality through the power of community funding
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/projects" className="group relative btn bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg shadow-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
                                    <span className="relative z-10">Explore Projects</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                </Link>
                                <Link to="/create-project" className="group btn bg-transparent hover:bg-white hover:bg-opacity-10 px-8 py-4 text-lg border-2 border-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <span className="flex items-center gap-2">
                                        Start a Project
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block animate-fade-in-right">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse-slow"></div>
                                <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                                        alt="Team collaboration"
                                        className="rounded-xl w-full h-auto shadow-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animation-delay-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                                <span className="text-4xl">💰</span>
                            </div>
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">$10M+</div>
                            <div className="text-slate-600 font-semibold text-lg">Funds Raised</div>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animation-delay-400">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                                <span className="text-4xl">🚀</span>
                            </div>
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">5,000+</div>
                            <div className="text-slate-600 font-semibold text-lg">Projects Funded</div>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-purple-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animation-delay-600">
                            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                                <span className="text-4xl">👥</span>
                            </div>
                            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 mb-2">50K+</div>
                            <div className="text-slate-600 font-semibold text-lg">Active Supporters</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Success Stories
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Featured Campaigns</h2>
                        <p className="text-slate-600 text-xl max-w-2xl mx-auto">Discover amazing projects that reached their goals and made real impact</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up animation-delay-200">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop" alt="Tech Innovation" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-6 bg-gradient-to-br from-white to-blue-50">
                                <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 shadow">Technology</div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">AI-Powered Learning Platform</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">Revolutionary education technology helping students worldwide achieve their potential</p>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                    <span className="text-blue-600 font-bold text-lg">$50,000 raised</span>
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                        <span className="text-xl">✓</span> Funded
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up animation-delay-400">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop" alt="Healthcare" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-6 bg-gradient-to-br from-white to-rose-50">
                                <div className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 shadow">Healthcare</div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-rose-600 transition-colors duration-300">Medical Equipment for Rural Clinics</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">Bringing essential healthcare to underserved communities</p>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                    <span className="text-rose-600 font-bold text-lg">$35,000 raised</span>
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                        <span className="text-xl">✓</span> Funded
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up animation-delay-600">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop" alt="Environment" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-6 bg-gradient-to-br from-white to-emerald-50">
                                <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 shadow">Environment</div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">Ocean Cleanup Initiative</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">Innovative solution to remove plastic from our oceans</p>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                    <span className="text-emerald-600 font-bold text-lg">$75,000 raised</span>
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                        <span className="text-xl">✓</span> Funded
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12 animate-fade-in-up animation-delay-800">
                        <Link to="/projects" className="group btn btn-primary px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <span className="flex items-center gap-2">
                                View All Projects
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Browse by Category</h2>
                        <p className="text-slate-600 text-xl">Find projects that match your interests</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/projects?category=${category.name.toLowerCase()}`}
                                className="group card p-8 text-center hover:scale-110 transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                                    {category.icon}
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">How It Works</h2>
                        <p className="text-slate-600 text-xl">Get started in three simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-10 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-200">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform duration-300">
                                <span className="text-4xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Create Your Project</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Share your vision, set your funding goal, and tell your story with compelling media
                            </p>
                        </div>
                        <div className="card p-10 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-400">
                            <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform duration-300">
                                <span className="text-4xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Share & Promote</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Spread the word and build a community of supporters around your project
                            </p>
                        </div>
                        <div className="card p-10 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-600">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-6 transition-transform duration-300">
                                <span className="text-4xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Reach Your Goal</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Get funded and bring your project to life with supporter backing
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!isAuthenticated && (
                <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                            Ready to Make an Impact?
                        </h2>
                        <p className="text-xl md:text-2xl mb-10 text-slate-300 leading-relaxed">
                            Start your crowdfunding journey today and join our thriving community of creators and supporters
                        </p>
                        <Link to="/register" className="group inline-block btn bg-white text-slate-900 hover:bg-slate-100 px-12 py-5 text-xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-300">
                            <span className="flex items-center gap-3">
                                Get Started Free
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
                            </span>
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
