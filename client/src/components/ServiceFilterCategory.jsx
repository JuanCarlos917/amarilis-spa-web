import React from 'react';
import { motion } from 'framer-motion';

const ServiceFilterCategory = ({ categories, activeCategory, onCategoryChange, icons }) => {
    return (
        <div className="relative mb-12 w-full">
            {/* Mobile: Fade effect to indicate more content */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden z-10" />

            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-3 pb-4 md:pb-0 scrollbar-hide snap-x justify-start md:justify-center px-4 md:px-0">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`
                                relative snap-center shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 z-0
                                ${isActive
                                    ? 'text-marron-profundo font-bold'
                                    : 'text-stone-600 hover:text-marron-profundo bg-stone-100/50 border border-stone-200 hover:border-oro-principal/30'
                                }
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-oro-principal rounded-full -z-10 shadow-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="text-lg relative z-10">{icons[cat] || icons['Otros']}</span>
                            <span className="relative z-10">{cat === 'All' ? 'Todos' : cat}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceFilterCategory;
