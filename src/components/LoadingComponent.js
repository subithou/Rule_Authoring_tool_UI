// import React, { useState, useEffect } from 'react';

// const LoadingComponent = () => {
//   const [progress, setProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState('Uploading...');

//   // Simulating progress increment
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   // Dynamic loading text based on progress
//   useEffect(() => {
//     if (progress < 50) {
//       setLoadingText('Uploading...');
//     } else if (progress < 80) {
//       setLoadingText('Importing...');
//     } else {
//       setLoadingText('Successful');
//     }
//   }, [progress]);

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-gray-200 h-6">
//       <div
//         className="h-full bg-blue-500"
//         style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
//       />
//       <div className="absolute top-0 left-0 right-0 text-center text-xs font-semibold text-gray-700">
//         {loadingText}
//       </div>
//     </div>
//   );
// };

// export default LoadingComponent;
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
    if (progress < 30) {
      setLoadingText('Uploading...');
    } else if (progress < 90) {
      setLoadingText('Importing...');
    } else {
      setLoadingText('Successful');
    }
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="w-64 text-center text-sm text-white">
        <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
          />
        </div>
        <div className="mt-2">
          {loadingText}
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;