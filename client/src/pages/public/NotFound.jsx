import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-center px-4">
            <h1 className="text-9xl font-bold text-primary-DEFAULT opacity-20">404</h1>
            <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mt-4">Page Not Found</h2>
            <p className="text-text-light dark:text-text-dark opacity-60 mt-4 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="flex items-center gap-2 bg-primary-DEFAULT hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors"
            >
                <Home size={20} /> Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
