import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';
import CategoryIcon from '../common/CategoryIcon';
import ShareModal from '../common/ShareModal';
import { getCategoryConfig } from '../../constants/categoryConfig';

const ProjectCard = ({ project }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const daysLeft = Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    const categoryConfig = getCategoryConfig(project.category);

    const handleShareClick = (e) => {
        e.preventDefault();
        setShowShareModal(true);
    };

    return (
        <>
            <div className="card hover:scale-105 transition-all group relative">
                <Link to={`/projects/${project._id}`}>
                    {/* Image */}
                    <div className={`h-48 bg-gradient-to-br ${categoryConfig.gradient} relative overflow-hidden`}>
                        {project.images && project.images[0] ? (
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-7xl opacity-30 drop-shadow-lg">{categoryConfig.icon}</span>
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                            <CategoryIcon category={project.category} size="sm" />
                        </div>

                        {/* Share Button */}
                        <button
                            onClick={handleShareClick}
                            className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all hover:scale-110 z-10"
                            title="Share Project"
                        >
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Progress */}
                        <ProgressBar current={project.currentAmount} goal={project.goalAmount} />

                        {/* Stats */}
                        <div className="mt-4 flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                <span className="text-gray-600 font-medium">{project.donors?.length || 0} backers</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className={`font-semibold ${daysLeft > 0 ? 'text-cyan-600' : 'text-red-600'}`}>
                                    {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                project={project}
            />
        </>
    );
};

export default ProjectCard;
