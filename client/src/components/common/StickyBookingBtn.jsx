import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyBookingBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 50px
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 left-4 right-4 z-50 flex md:hidden gap-3"
                >
                    {/* WhatsApp Button (Quick Question) */}
                    <a
                        href="https://wa.me/573000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                        aria-label="Chat en WhatsApp"
                    >
                        <MessageCircle size={24} />
                    </a>

                    {/* Booking Button (Main CTA) */}
                    <Link
                        to="/booking"
                        className="flex-1 bg-oro-principal text-marron-profundo font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-oro-oscuro transition-colors"
                    >
                        <Calendar size={20} />
                        <span>Agendar Cita</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyBookingBtn;
