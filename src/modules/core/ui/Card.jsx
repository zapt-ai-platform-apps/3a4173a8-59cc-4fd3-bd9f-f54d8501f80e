import React from 'react';

export default function Card({ children, className = '', padding = 'p-4' }) {
  return (
    <div className={`bg-white rounded-lg shadow ${padding} ${className}`}>
      {children}
    </div>
  );
}