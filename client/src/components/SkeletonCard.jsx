import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm animate-pulse flex flex-col h-full border border-transparent">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200 rounded-sm mb-4"></div>
      
      {/* Details Skeleton */}
      <div className="flex-grow flex flex-col">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>

        <div className="mt-auto flex items-baseline space-x-2">
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
