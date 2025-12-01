import React, { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import api from '../../api/axios';
import axios from 'axios'; // Direct import for external API
import toast, { Toaster } from 'react-hot-toast';

const SiteInfoManager = () => {
    const [formData, setFormData] = useState({
        heroTitle: '',
        heroSubtitle: '',
        aboutText: '',
        contactPhone: '',
        contactEmail: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Phone specific state
    const [countries, setCountries] = useState([]);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetchCountries();
        fetchInfo();
    }, []);

    const fetchCountries = async () => {
        try {
            // Fetch only necessary fields: idd (dial code), flag (emoji), cca2 (code)
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=idd,flag,cca2');
            const data = response.data;

            const formattedCountries = data
                .filter(country => country.idd?.root)
                .map(country => {
                    const root = country.idd.root;
                    const suffix = country.idd.suffixes?.[0] || '';
                    const dialCode = root + suffix;

                    return {
                        code: country.cca2,
                        flag: country.flag, // Use the emoji flag
                        dialCode: dialCode,
                        numericCode: parseInt(dialCode.replace(/\D/g, ''), 10) // For sorting
                    };
                })
                .sort((a, b) => a.numericCode - b.numericCode); // Sort by numeric dial code

            setCountries(formattedCountries);
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Fallback to basic codes if API fails
            setCountries([
                { code: 'US', flag: '🇺🇸', dialCode: '+1', numericCode: 1 },
                { code: 'CO', flag: '🇨🇴', dialCode: '+57', numericCode: 57 },
                { code: 'ES', flag: '🇪🇸', dialCode: '+34', numericCode: 34 },
                { code: 'MX', flag: '🇲🇽', dialCode: '+52', numericCode: 52 }
            ].sort((a, b) => a.numericCode - b.numericCode));
        }
    };

    const fetchInfo = async () => {
        try {
            const res = await api.get('/info');
            if (res.data) {
                setFormData({
                    heroTitle: res.data.heroTitle || '',
                    heroSubtitle: res.data.heroSubtitle || '',
                    aboutText: res.data.aboutText || '',
                    contactPhone: res.data.contactPhone || '',
                    contactEmail: res.data.contactEmail || '',
                    address: res.data.address || ''
                });

                // Parse phone number
                if (res.data.contactPhone) {
                    const parts = res.data.contactPhone.split(' ');
                    if (parts.length >= 2) {
                        setSelectedCountryCode(parts[0]);
                        // Join the rest and remove spaces to show raw number in input
                        setPhoneNumber(parts.slice(1).join('').replace(/\s/g, ''));
                    } else {
                        setPhoneNumber(res.data.contactPhone);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching site info:', error);
            toast.error('Failed to load site information');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const formatPhoneNumber = (num) => {
        const cleaned = ('' + num).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]} ${match[2]} ${match[3]}`;
        }
        return cleaned; // Fallback for non-standard lengths
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Format phone number with spaces using the new logic
        const formattedNumber = formatPhoneNumber(phoneNumber);

        // Combine phone code and formatted number
        const fullPhone = `${selectedCountryCode} ${formattedNumber}`;
        const dataToSave = { ...formData, contactPhone: fullPhone };

        try {
            await api.put('/info', dataToSave);
            // Update local state to match saved data
            setFormData(dataToSave);
            toast.success('Site information updated successfully! 🚀');
        } catch (error) {
            console.error('Error updating site info:', error);
            toast.error('Failed to update site information');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-primary-DEFAULT" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Site Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-6">
                    {/* Hero Section */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Hero Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Title</label>
                                <input
                                    type="text"
                                    name="heroTitle"
                                    value={formData.heroTitle}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                    placeholder="e.g. Welcome to Amarilis Spa"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Subtitle</label>
                                <input
                                    type="text"
                                    name="heroSubtitle"
                                    value={formData.heroSubtitle}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                    placeholder="e.g. Experience Ultimate Relaxation"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <div className="flex gap-2">
                                    <select
                                        value={selectedCountryCode}
                                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                                        className="w-1/3 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                    >
                                        {countries.map((country) => (
                                            <option key={`${country.code}-${country.dialCode}`} value={country.dialCode}>
                                                {country.flag} {country.dialCode}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        className="w-2/3 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                        placeholder="1234567890"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                    placeholder="info@amarilisspa.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Physical Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                    placeholder="123 Wellness Blvd, Serenity City"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">About Section</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Text</label>
                            <textarea
                                name="aboutText"
                                value={formData.aboutText}
                                onChange={handleChange}
                                rows="4"
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-DEFAULT outline-none transition-all"
                                placeholder="Tell your story..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SiteInfoManager;
