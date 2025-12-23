const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Propel</h3>
                        <p className="text-gray-400 text-sm">
                            Empowering creators to bring their ideas to life through crowdfunding.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/projects" className="text-gray-400 hover:text-white transition">Browse Projects</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                            <li><a href="/create-project" className="text-gray-400 hover:text-white transition">Start a Project</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">How It Works</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/projects?category=technology" className="text-gray-400 hover:text-white transition">Technology</a></li>
                            <li><a href="/projects?category=education" className="text-gray-400 hover:text-white transition">Education</a></li>
                            <li><a href="/projects?category=healthcare" className="text-gray-400 hover:text-white transition">Healthcare</a></li>
                            <li><a href="/projects?category=environment" className="text-gray-400 hover:text-white transition">Environment</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: needforc@gmail.com</li>
                            <li>Phone: +91 9102498827</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Propel Crowdfunding. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
