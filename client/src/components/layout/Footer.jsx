import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, MessageCircle, Lock } from 'lucide-react';
import api from '../../api/axios';

const Footer = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get(`/info?t=${new Date().getTime()}`);
                setInfo(res.data);
            } catch (error) {
                console.error('Error fetching site info:', error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <footer className="bg-surface-light dark:bg-surface-dark py-12 transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-primary-DEFAULT dark:text-primary-light mb-4">
                            Amarilis Spa
                        </h3>
                        <p className="text-text-light dark:text-text-dark opacity-80">
                            {info?.heroSubtitle || 'Experience the ultimate relaxation and rejuvenation. Your sanctuary for wellness and beauty.'}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Contact</h4>
                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.address || '123 Wellness Ave, Serenity City'}</p>
                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.contactPhone || '+1 (555) 123-4567'}</p>
                        <p className="text-text-light dark:text-text-dark opacity-80">{info?.contactEmail || 'info@amarilisspa.com'}</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-text-light dark:text-text-dark hover:text-primary-DEFAULT transition-colors">
                                <Instagram />
                            </a>
                            <a href="#" className="text-text-light dark:text-text-dark hover:text-primary-DEFAULT transition-colors">
                                <Facebook />
                            </a>
                            <a href="#" className="text-text-light dark:text-text-dark hover:text-primary-DEFAULT transition-colors">
                                <MessageCircle />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-text-light dark:text-text-dark opacity-60">
                    <p>© {new Date().getFullYear()} Amarilis Spa. All rights reserved.</p>
                    <a href="/login" className="flex items-center gap-1 hover:text-primary-DEFAULT transition-colors mt-4 md:mt-0">
                        <Lock size={14} /> Staff Access
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
