import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const OffersCarousel = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await api.get('/offers/active');
                setOffers(res.data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading || offers.length === 0) return null;

    return (
        <section className="py-16 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-bold text-center text-primary-DEFAULT dark:text-primary-light mb-12">
                    Special Offers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-background-light dark:bg-background-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            {offer.image && (
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{offer.title}</h3>
                                    <span className="bg-secondary-DEFAULT text-white text-sm px-3 py-1 rounded-full">
                                        {offer.discountPercentage}% OFF
                                    </span>
                                </div>
                                <p className="text-text-light dark:text-text-dark opacity-80 mb-4">{offer.description}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Expires: {new Date(offer.expiryDate).toLocaleDateString()}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OffersCarousel;
