import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle }) => {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
            >
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-300"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
                >
                    {title || 'Rediscover Your Inner Peace'}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-200 mb-8"
                >
                    {subtitle || 'Disfrute del máximo lujo y relajación en Amarilis Spa. Su viaje hacia el bienestar comienza aquí.'}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/booking"
                        className="bg-primary-DEFAULT hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
                    >
                        Book Appointment
                    </Link>
                    <Link
                        to="/services"
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full text-lg font-medium transition-colors"
                    >
                        View Services
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
