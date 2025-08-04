import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '🎥 Face Tracking', id: 'face' },
    { path: '/speech', label: '🎤 Text-to-Speech', id: 'speech' },
    { path: '/advanced', label: '🎭 Advanced Lip-Sync', id: 'advanced' },
    { path: '/video', label: '🎬 AI Video Generator', id: 'video' }
  ];

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link 
              to={item.path}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                  : 'text-blue-600 hover:bg-blue-50'
                }
              `}
            >
              {item.label}
            </Link>
            {index < navItems.length - 1 && (
              <div className="w-px h-5 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;