import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../../api/axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/info');
                setInfo(res.data);
            } catch (error) {
                console.error('Error fetching site info:', error);
            }
        };
        fetchInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-center text-primary-DEFAULT dark:text-primary-light mb-12">
                    Contact Us
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-primary-DEFAULT dark:text-primary-light mt-1" />
                                    <div>
                                        <h4 className="font-bold text-text-light dark:text-text-dark">Visit Us</h4>
                                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.address || '123 Wellness Ave, Serenity City'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="text-primary-DEFAULT dark:text-primary-light mt-1" />
                                    <div>
                                        <h4 className="font-bold text-text-light dark:text-text-dark">Call Us</h4>
                                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.contactPhone || '+1 (555) 123-4567'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="text-primary-DEFAULT dark:text-primary-light mt-1" />
                                    <div>
                                        <h4 className="font-bold text-text-light dark:text-text-dark">Email Us</h4>
                                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.contactEmail || 'info@amarilisspa.com'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="text-primary-DEFAULT dark:text-primary-light mt-1" />
                                    <div>
                                        <h4 className="font-bold text-text-light dark:text-text-dark">Opening Hours</h4>
                                        <p className="text-text-light dark:text-text-dark opacity-80">Mon-Fri: 9am - 8pm</p>
                                        <p className="text-text-light dark:text-text-dark opacity-80">Sat-Sun: 10am - 6pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
                    >
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-colors"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-primary-DEFAULT hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && (
                                <p className="text-green-500 text-center">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500 text-center">Error sending message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
