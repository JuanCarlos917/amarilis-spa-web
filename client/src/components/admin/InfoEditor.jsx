import React, { useState, useEffect } from 'react';
import { Save, Globe } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const InfoEditor = () => {
    const [info, setInfo] = useState({
        name: '',
        tagline: '',
        description: '',
        contactEmail: '',
        phoneNumber: '',
        address: '',
        socialLinks: {
            facebook: '',
            instagram: '',
            whatsapp: ''
        }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const res = await api.get('/info');
            if (res.data) {
                setInfo(res.data);
            }
        } catch (error) {
            console.error('Error fetching site info:', error);
            toast.error('Failed to load site info');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setInfo(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setInfo(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Always update the singleton, no ID needed in URL
            await api.put('/info', info);
            toast.success('Site info updated successfully');
        } catch (error) {
            console.error('Error updating info:', error);
            toast.error('Failed to update site info');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Globe className="text-primary-DEFAULT" /> Site Information
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <button
                    type="submit"
                    className="w-full bg-primary-DEFAULT text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default InfoEditor;
