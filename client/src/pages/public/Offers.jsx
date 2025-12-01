import React, { useState, useEffect } from 'react';
import { Tag, Clock, ArrowRight } from 'lucide-react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await api.get(`/offers?t=${new Date().getTime()}`);
                // Filter only active offers
                const activeOffers = res.data.filter(offer => offer.isActive);
                setOffers(activeOffers);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-DEFAULT"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                        Exclusive Offers
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Indulge in our special packages designed to provide you with the ultimate relaxation experience at unbeatable prices.
                    </p>
                </div>

                {offers.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Active Offers</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Check back soon for new promotions!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offers.map((offer) => (
                            <div key={offer._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                {offer.image && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={offer.image}
                                            alt={offer.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
                                            {offer.title}
                                        </h3>
                                        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                            {offer.discountPercentage}% OFF
                                        </span>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                                        {offer.description}
                                    </p>

                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <Clock size={16} className="mr-2" />
                                            <span>Valid until: {new Date(offer.expiryDate).toLocaleDateString()}</span>
                                        </div>

                                        <Link
                                            to="/booking"
                                            className="w-full btn-primary flex justify-center items-center gap-2 group"
                                        >
                                            Book Now
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Offers;
