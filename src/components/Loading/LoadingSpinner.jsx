import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__circle">
        <div className="loading-spinner__dot loading-spinner__dot--1"></div>
        <div className="loading-spinner__dot loading-spinner__dot--2"></div>
        <div className="loading-spinner__dot loading-spinner__dot--3"></div>
      </div>
      {message && (
        <p className="loading-spinner__message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;