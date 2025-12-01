import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import api from '../../api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await api.post('/auth/forgot-password', { email });
            setStatus('success');
            setMessage(res.data.message);
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-primary-DEFAULT p-4 rounded-full">
                        <Mail className="text-white" size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Forgot Password?</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                            {message}
                        </div>
                        <Link to="/login" className="text-primary-DEFAULT hover:underline font-medium">
                            Return to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === 'error' && (
                            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">{message}</div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-primary-DEFAULT hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <div className="text-center">
                            <Link to="/login" className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-DEFAULT transition-colors">
                                <ArrowLeft size={16} /> Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
