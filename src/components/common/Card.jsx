import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title,
  subtitle,
  variant = 'default',
  padding = 'lg'
}) => {
  const baseClasses = "bg-white rounded-2xl shadow-lg border transition-all duration-300";
  
  const variants = {
    default: "border-gray-200 bg-gradient-to-br from-white to-gray-50",
    primary: "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50",
    success: "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
    purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50"
  };
  
  const paddings = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${className}
  `.trim();

  return (
    <div className={classes}>
      {title && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;