import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import api from '../../api/axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setStatus('error');
            return setMessage('Passwords do not match');
        }

        try {
            await api.post('/auth/reset-password', {
                token,
                newPassword: formData.newPassword
            });
            setStatus('success');
            setMessage('Password has been reset successfully');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-primary-DEFAULT p-4 rounded-full">
                        <Lock className="text-white" size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Reset Password</h2>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                            {message}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Redirecting to login...</p>
                        <Link to="/login" className="text-primary-DEFAULT hover:underline font-medium">
                            Click here if not redirected
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === 'error' && (
                            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">{message}</div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                            <input
                                type="password"
                                required
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-primary-DEFAULT hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
