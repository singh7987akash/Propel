// Category configuration with icons and colors
export const CATEGORY_CONFIG = {
    technology: {
        name: 'Technology',
        icon: '💻',
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-300'
    },
    education: {
        name: 'Education',
        icon: '📚',
        gradient: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-300'
    },
    healthcare: {
        name: 'Healthcare',
        icon: '🏥',
        gradient: 'from-red-500 to-rose-500',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-300'
    },
    environment: {
        name: 'Environment',
        icon: '🌱',
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-300'
    },
    community: {
        name: 'Community',
        icon: '🤝',
        gradient: 'from-orange-500 to-amber-500',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-300'
    }
};

export const getCategoryConfig = (category) => {
    return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.technology;
};

export const getAllCategories = () => {
    return Object.keys(CATEGORY_CONFIG);
};
