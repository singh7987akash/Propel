const ProgressBar = ({ current, goal, className = '' }) => {
    const percentage = Math.min((current / goal) * 100, 100);

    // Determine green color intensity based on percentage
    let barColor = '';
    if (percentage < 25) {
        barColor = 'from-green-300 to-green-400';
    } else if (percentage < 50) {
        barColor = 'from-green-400 to-green-500';
    } else if (percentage < 75) {
        barColor = 'from-green-500 to-green-600';
    } else {
        barColor = 'from-green-600 to-emerald-700';
    }

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                    ${current.toLocaleString()} raised
                </span>
                <span className="text-sm font-medium text-gray-500">
                    ${goal.toLocaleString()} goal
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`bg-gradient-to-r ${barColor} h-full rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="mt-1 text-xs text-green-600 font-medium text-right">
                {percentage.toFixed(1)}% funded
            </div>
        </div>
    );
};

export default ProgressBar;
