// Loading.js
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    // <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
    <div className="flex items-center justify-center z-50">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div> */}

      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#475569"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;