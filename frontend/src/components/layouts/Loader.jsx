import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <img src="https://www.svgrepo.com/show/484653/loading-part-2.svg" alt="Loading" className="w-20 h-20 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
