import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import api from '../../api/axios';

// Category Icon Mapping (Emojis as requested for premium feel)
const CATEGORY_ICONS = {
    'Tratamientos Faciales': '✨',
    'Depilación': '🕯️',
    'Masajes Relajantes': '💆‍♀️',
    'Combos de Masajes': '🧘‍♀️',
    'Paquetes Reductores': '🍃',
    'Spa Niños': '👑',
    'Zonas Húmedas': '💧',
    'Cejas y Pestañas': '👁️',
    'Uñas': '💅',
    'Peluquería': '💇‍♀️',
    'Maquillaje': '💄',
    'Eventos Especiales': '🥂',
    'Otros': '🌸',
    'All': '🌟'
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Dynamic Categories
    const categories = useMemo(() => {
        const uniqueCats = [...new Set(services.map(s => s.category))];
        return ['All', ...uniqueCats.sort()];
    }, [services]);

    // Filtered Services
    const filteredServices = useMemo(() => {
        if (activeCategory === 'All') return services;
        return services.filter(s => s.category === activeCategory);
    }, [activeCategory, services]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background-light dark:bg-background-dark">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-primary-DEFAULT dark:text-primary-light mb-4">
                        Nuestros Servicios
                    </h1>
                    <p className="text-text-light dark:text-text-dark opacity-80 max-w-2xl mx-auto">
                        Descubre nuestro menú de tratamientos diseñados para tu bienestar y belleza.
                    </p>
                </div>

                {/* Dynamic Category Tabs (Horizontal Scroll) */}
                <div className="relative mb-12">
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x justify-start md:justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`snap-center shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${activeCategory === cat
                                    ? 'bg-primary text-white border-primary shadow-lg transform scale-105'
                                    : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                    }`}
                            >
                                <span className="text-lg">{CATEGORY_ICONS[cat] || CATEGORY_ICONS['Otros']}</span>
                                <span>{cat === 'All' ? 'Todos' : cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        <AnimatePresence mode='popLayout'>
                            {filteredServices.map((service) => (
                                <motion.div
                                    layout
                                    key={service._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all flex flex-col h-full w-full max-w-sm group"
                                >
                                    {/* Card Header */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-text-light dark:text-white shadow-sm flex items-center gap-1">
                                            {CATEGORY_ICONS[service.category]} {service.category}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-text-light dark:text-text-dark font-serif leading-tight">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2 flex items-center gap-1">
                                                <Sparkles size={14} className="text-primary" />
                                                {service.duration}
                                            </p>
                                            <p className="text-text-light dark:text-text-dark opacity-80 text-sm line-clamp-2">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Features List (Top 3) */}
                                        {service.features && service.features.length > 0 && (
                                            <div className="mb-6 bg-background-light dark:bg-background-dark/50 p-3 rounded-xl">
                                                <ul className="space-y-1.5">
                                                    {service.features.slice(0, 3).map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                                                            <Check size={14} className="text-secondary mt-0.5 shrink-0" />
                                                            <span className="line-clamp-1">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Pricing Footer */}
                                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                            {service.pricingOptions && service.pricingOptions.length > 1 ? (
                                                <div className="space-y-2">
                                                    {service.pricingOptions.map((opt, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-sm group/price hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1 rounded transition-colors">
                                                            <span className="text-gray-600 dark:text-gray-300 font-medium">{opt.label}</span>
                                                            <div className="flex-1 border-b border-dotted border-gray-300 mx-2 relative top-1 opacity-50"></div>
                                                            <span className="font-bold text-primary-DEFAULT dark:text-primary-light whitespace-nowrap">
                                                                {formatPrice(opt.price)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">Precio</span>
                                                    <span className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light">
                                                        {service.pricingOptions && service.pricingOptions[0]
                                                            ? formatPrice(service.pricingOptions[0].price)
                                                            : formatPrice(service.price || 0)
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Services;
