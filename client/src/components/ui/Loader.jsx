import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-light rounded-full opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-DEFAULT rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
