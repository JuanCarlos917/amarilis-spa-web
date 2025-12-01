import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Check, Minus } from 'lucide-react';
import api from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['Masajes', 'Faciales', 'Corporales', 'Zonas Húmedas', 'Niños', 'Depilación', 'Eventos', 'Otros'];

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        category: 'Masajes',
        image: '',
        features: [],
        pricingOptions: []
    });

    // Temporary states for inputs
    const [newFeature, setNewFeature] = useState('');
    const [newPriceLabel, setNewPriceLabel] = useState('');
    const [newPriceValue, setNewPriceValue] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load services');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (formData.pricingOptions.length === 0) {
            toast.error('Please add at least one pricing option');
            setLoading(false);
            return;
        }

        try {
            if (currentService) {
                await api.put(`/services/${currentService._id}`, formData);
                toast.success('Service updated successfully!');
            } else {
                await api.post('/services', formData);
                toast.success('Service created successfully!');
            }
            await fetchServices();
            resetForm();
        } catch (error) {
            console.error('Error saving service:', error);
            toast.error('Error saving service');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                toast.success('Service deleted');
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                toast.error('Could not delete service');
            }
        }
    };

    const startEdit = (service) => {
        setCurrentService(service);
        setFormData({
            ...service,
            features: service.features || [],
            pricingOptions: service.pricingOptions || []
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setCurrentService(null);
        setFormData({
            title: '', description: '', duration: '', category: 'Masajes', image: '',
            features: [], pricingOptions: []
        });
        setNewFeature('');
        setNewPriceLabel('');
        setNewPriceValue('');
        setIsEditing(false);
    };

    // --- Dynamic Field Handlers ---

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
            setNewFeature('');
        }
    };

    const removeFeature = (index) => {
        const updated = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: updated });
    };

    const addPricingOption = () => {
        if (newPriceLabel.trim() && newPriceValue) {
            setFormData({
                ...formData,
                pricingOptions: [...formData.pricingOptions, { label: newPriceLabel.trim(), price: Number(newPriceValue) }]
            });
            setNewPriceLabel('');
            setNewPriceValue('');
        }
    };

    const removePricingOption = (index) => {
        const updated = formData.pricingOptions.filter((_, i) => i !== index);
        setFormData({ ...formData, pricingOptions: updated });
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Services</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> Add Service
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {currentService ? 'Edit Service' : 'New Service'}
                        </h3>
                        <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input
                                type="text"
                                placeholder="Duration (e.g., 60 min)"
                                required
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                required
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                            <textarea
                                placeholder="Description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:col-span-2"
                                rows="3"
                            />
                        </div>

                        {/* Features Builder */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features (Included)</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Add a feature (e.g., Includes Sauna)"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                />
                                <button type="button" onClick={addFeature} className="bg-secondary text-white p-2 rounded-lg hover:bg-secondary-dark">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {formData.features.map((feature, idx) => (
                                    <li key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm">
                                        <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                        <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700">
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing Builder */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pricing Options</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Label (e.g., 1 Person)"
                                    value={newPriceLabel}
                                    onChange={(e) => setNewPriceLabel(e.target.value)}
                                    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newPriceValue}
                                    onChange={(e) => setNewPriceValue(e.target.value)}
                                    className="w-32 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <button type="button" onClick={addPricingOption} className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {formData.pricingOptions.map((opt, idx) => (
                                    <li key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm">
                                        <span className="text-gray-700 dark:text-gray-200 font-medium">{opt.label}: ${opt.price}</span>
                                        <button type="button" onClick={() => removePricingOption(idx)} className="text-red-500 hover:text-red-700">
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Save size={18} />
                                {loading ? 'Saving...' : 'Save Service'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800 dark:text-white">{service.title}</h3>
                                <span className="text-xs bg-secondary/20 text-secondary-dark px-2 py-1 rounded-full">
                                    {service.category}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {service.pricingOptions && service.pricingOptions.length > 0 ? (
                                    <div className="space-y-1">
                                        {service.pricingOptions.slice(0, 2).map((opt, i) => (
                                            <div key={i} className="flex justify-between">
                                                <span>{opt.label}</span>
                                                <span className="font-medium text-gray-800 dark:text-gray-200">${opt.price}</span>
                                            </div>
                                        ))}
                                        {service.pricingOptions.length > 2 && <span className="text-xs italic">+ more options</span>}
                                    </div>
                                ) : (
                                    <span>${service.price}</span>
                                )}
                            </div>
                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => startEdit(service)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceManager;
