import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 h-full w-full max-w-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="h-56 bg-gray-200 dark:bg-gray-700 w-full"></div>

            {/* Body Skeleton */}
            <div className="p-6 flex-1 flex flex-col space-y-4">
                {/* Title */}
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

                {/* Duration */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>

                {/* Footer/Price */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
