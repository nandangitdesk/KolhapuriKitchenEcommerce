import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <img src="https://www.svgrepo.com/show/521518/book-open.svg" alt="Loading" className="w-20 h-20 animate-pulse" />
        <p className="mt-4 text-lg font-semibold text-[#111418] animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
