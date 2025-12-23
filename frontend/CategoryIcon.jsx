import { getCategoryConfig } from '../../constants/categoryConfig';

const CategoryIcon = ({ category, size = 'md', showLabel = false, className = '' }) => {
    const config = getCategoryConfig(category);

    const sizeClasses = {
        sm: 'w-8 h-8 text-lg',
        md: 'w-12 h-12 text-2xl',
        lg: 'w-16 h-16 text-4xl',
        xl: 'w-20 h-20 text-5xl'
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className={`${sizeClasses[size]} flex items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} shadow-md`}>
                <span className="drop-shadow-sm">{config.icon}</span>
            </div>
            {showLabel && (
                <span className={`font-semibold ${config.textColor}`}>
                    {config.name}
                </span>
            )}
        </div>
    );
};

export default CategoryIcon;
