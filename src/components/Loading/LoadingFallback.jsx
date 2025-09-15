import React, { memo } from "react";


const LoadingFallback = memo(() => (
  <div 
    className="loading-fallback"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      fontSize: '14px',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-family)',
      background: 'var(--background-primary)',
      animation: 'fadeIn 0.3s ease-out'
    }}
  >
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        background: 'var(--background-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div 
        style={{
          width: '16px',
          height: '16px',
          border: '2px solid var(--border-color)',
          borderTop: '2px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <span>Loading...</span>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;