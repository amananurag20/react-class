import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  status = '', 
  showPercentage = true,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-blue-600">{status}</span>
        {showPercentage && (
          <span className="text-xl font-bold text-gray-800">{progress}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>
      <div className="text-center mt-3 text-gray-600 text-sm italic">
        ⏱️ Video generation typically takes 1-3 minutes
      </div>
    </div>
  );
};

export default ProgressBar;