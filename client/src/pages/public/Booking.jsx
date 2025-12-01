import React, { useEffect } from 'react';

const Booking = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head.appendChild(script);

        return () => {
            head.removeChild(script);
        };
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-background-light dark:bg-background-dark">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-serif font-bold text-center text-primary-DEFAULT dark:text-primary-light mb-8">
                    Book Your Appointment
                </h1>
                <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/amarilis-spa-demo/30min"
                    style={{ minWidth: '320px', height: '700px' }}
                />
            </div>
        </div>
    );
};

export default Booking;
