import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/home/Hero';
import OffersCarousel from '../../components/home/OffersCarousel';
import api from '../../api/axios';

const Home = () => {
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
        <div className="min-h-screen">
            <Helmet>
                <title>{info?.heroTitle ? `${info.heroTitle} | Amarilis Spa` : 'Amarilis Spa | Luxury Wellness Center'}</title>
                <meta name="description" content={info?.aboutText || "Experience the ultimate relaxation at Amarilis Spa. Massages, facials, and wellness treatments in a serene environment."} />
            </Helmet>
            <Hero title={info?.heroTitle} subtitle={info?.heroSubtitle} />

            {/* About Section */}
            <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-DEFAULT dark:text-primary-light mb-6">
                        Who We Are
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {info?.aboutText || "Experience the ultimate relaxation at Amarilis Spa. Massages, facials, and wellness treatments in a serene environment."}
                    </p>
                </div>
            </section>

            <OffersCarousel />
            {/* Services Grid will go here */}
        </div>
    );
};

export default Home;
