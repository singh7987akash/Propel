import { Link } from 'react-router-dom';

const AboutUs = () => {
    const values = [
        {
            icon: '🎯',
            title: 'Our Mission',
            description: 'Empower creators and changemakers by connecting them with a global community of supporters who believe in their vision.'
        },
        {
            icon: '💡',
            title: 'Our Vision',
            description: 'Build a world where anyone with a great idea can bring it to life through the power of community funding and collaboration.'
        },
        {
            icon: '🌍',
            title: 'Our Impact',
            description: 'Enable positive change across technology, education, healthcare, environment, and community projects worldwide.'
        }
    ];

    const team = [
        {
            name: 'Navneet Parmar',
            role: 'Developer & CEO',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQFz5pm09qE4OQ/profile-displayphoto-shrink_400_400/B56ZYmJ2smGoAg-/0/1744396842924?e=1767830400&v=beta&t=yH8bM75V9BQoWS4pj2j123aQl9CFgtY0EXqOE5J5Orw',
            bio: 'Visionary leader with experience in tech and crowdfunding'
        },
        {
            name: 'Shubham Kumar',
            role: 'CTO & Developer',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQFGo6KYDhn86Q/profile-displayphoto-shrink_400_400/B56ZVf_iQOHQAg-/0/1741072246326?e=1767830400&v=beta&t=BmIBlKCX-bQ0tqpCnhpowutjnmDqd4sdCt7ykCRXMOs',
            bio: 'Full-stack and Software developer passionate about building scalable platforms'
        },
        {
            name: 'Akash Singh',
            role: 'Head of Community',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQHOumX34eOAHA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701444877966?e=1767830400&v=beta&t=1eabVViatA3-pnkptHNWglFjC-q9QBvGdT_qjm2-ynk',
            bio: 'Community builder dedicated to connecting creators with supporters'
        },
        
    ];

    const stats = [
        { number: '$50M+', label: 'Funds Raised' },
        { number: '10K+', label: 'Successful Projects' },
        { number: '500K+', label: 'Active Community Members' },
       
    ];

    const features = [
        {
            icon: '🔒',
            title: 'Secure & Transparent',
            description: 'Bank-level security with transparent fund handling and milestone-based releases'
        },
        {
            icon: '⚡',
            title: 'Fast & Efficient',
            description: 'Quick campaign setup, rapid verification, and instant notifications'
        },
        {
            icon: '🤝',
            title: 'Community First',
            description: 'Built for genuine connections between creators and supporters'
        },
        {
            icon: '📊',
            title: 'Analytics & Insights',
            description: 'Detailed analytics to track progress, engagement, and impact'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                        About Propel
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
                        Empowering creators and changemakers to turn their dreams into reality through the power of community funding.
                    </p>
                </div>
            </section>

            {/* Mission, Vision, Impact Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="group card p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

         

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Why Choose Propel?</h2>
                        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                            We provide everything you need to launch, promote, and succeed with your project
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="card p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border-l-4 border-blue-600"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-6">
                                    <div className="text-4xl flex-shrink-0 transform group-hover:scale-125 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Meet Our Team</h2>
                        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                            Passionate individuals dedicated to making a difference
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={member.name}
                                className="group card overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-auto h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                                    <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Our Journey</h2>
                    </div>
                    <div className="space-y-8 relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-indigo-600 hidden md:block"></div>

                        {/* Timeline items */}
                        {[
                            { year: '2020', title: 'Propel Founded', description: 'Started with a mission to democratize crowdfunding' },
                            { year: '2021', title: 'First $1M Raised', description: 'Reached a milestone with 500+ successful projects' },
                            { year: '2022', title: 'Global Expansion', description: 'Extended to 100+ countries worldwide' },
                            { year: '2024', title: 'Newest Chapter', description: 'Reaching new heights with 10,000+ active projects' }
                        ].map((item, index) => (
                            <div
                                key={item.year}
                                className={`flex items-center animate-fade-in-up ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="md:w-1/2"></div>
                                <div className="flex justify-center md:w-auto">
                                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform hover:scale-125 transition-transform duration-300 z-10 relative">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="md:w-1/2 md:pl-8 pt-4 md:pt-0 pl-8">
                                    <div className="card p-8 hover:shadow-2xl transition-all duration-300">
                                        <div className="text-blue-600 font-bold text-xl mb-2">{item.year}</div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600 text-lg">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Be Part of Our Story?</h2>
                    <p className="text-xl mb-10 text-blue-100">
                        Join thousands of creators and supporters making a real impact every day
                    </p>
                    <Link
                        to="/projects"
                        className="group inline-block btn bg-white text-blue-600 hover:bg-slate-100 px-12 py-5 text-xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-300"
                    >
                        <span className="flex items-center gap-3">
                            Explore Projects
                            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
