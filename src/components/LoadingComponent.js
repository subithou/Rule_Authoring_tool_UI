import React, { useState, useEffect } from 'react';

const LoadingComponent = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Uploading...');

  // Simulating progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic loading text based on progress
  useEffect(() => {
    if (progress < 50) {
      setLoadingText('Uploading...');
    } else if (progress < 80) {
      setLoadingText('Importing...');
    } else {
      setLoadingText('Successful');
    }
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-200 h-6">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
      />
      <div className="absolute top-0 left-0 right-0 text-center text-xs font-semibold text-gray-700">
        {loadingText}
      </div>
    </div>
  );
};

export default LoadingComponent;