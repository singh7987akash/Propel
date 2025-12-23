import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projectService } from '../services/projectService';
import ProjectCard from '../components/project/ProjectCard';
import { CATEGORY_CONFIG } from '../constants/categoryConfig';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        status: searchParams.get('status') || '',
        search: searchParams.get('search') || '',
        sort: searchParams.get('sort') || ''
    });

    useEffect(() => {
        fetchProjects();
    }, [filters]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await projectService.getProjects(filters);
            setProjects(data);
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Update URL params
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        setSearchParams(params);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 pb-2 leading-tight">
                        Discover Projects
                    </h1>
                    <p className="text-gray-600 text-lg">Support innovative ideas and make a difference</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="label">🔍 Search</label>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label">📁 Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="input"
                            >
                                <option value="">All Categories</option>
                                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                                    <option key={key} value={key}>
                                        {config.icon} {config.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="label">📊 Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="input"
                            >
                                <option value="">All Status</option>
                                <option value="active">🟢 Active</option>
                                <option value="funded">✅ Funded</option>
                                <option value="closed">🔒 Closed</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="label">🔄 Sort By</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="input"
                            >
                                <option value="">⭐ Newest</option>
                                <option value="ending_soon">⏰ Ending Soon</option>
                                <option value="most_funded">💰 Most Funded</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading projects...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No projects found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
