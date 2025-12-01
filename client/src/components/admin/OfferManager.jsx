import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const OfferManager = () => {
    const [offers, setOffers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', discountPercentage: '', expiryDate: '', image: '', isActive: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const res = await api.get('/offers');
            setOffers(res.data);
        } catch (error) {
            console.error('Error fetching offers:', error);
            toast.error('Failed to load offers');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentOffer) {
                await api.put(`/offers/${currentOffer._id}`, formData);
                toast.success('Offer updated successfully');
            } else {
                await api.post('/offers', formData);
                toast.success('Offer created successfully');
            }
            await fetchOffers();
            resetForm();
        } catch (error) {
            console.error('Error saving offer:', error);
            toast.error('Failed to save offer');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            try {
                await api.delete(`/offers/${id}`);
                toast.success('Offer deleted successfully');
                fetchOffers();
            } catch (error) {
                console.error('Error deleting offer:', error);
                toast.error('Failed to delete offer');
            }
        }
    };

    const startEdit = (offer) => {
        setCurrentOffer(offer);
        setFormData({
            ...offer,
            expiryDate: new Date(offer.expiryDate).toISOString().split('T')[0]
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setCurrentOffer(null);
        setFormData({ title: '', description: '', discountPercentage: '', expiryDate: '', image: '', isActive: true });
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Offers</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> Add Offer
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {currentOffer ? 'Edit Offer' : 'New Offer'}
                        </h3>
                        <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="number"
                            placeholder="Discount %"
                            required
                            value={formData.discountPercentage}
                            onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="date"
                            required
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <div className="flex items-center gap-2 p-3">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-5 h-5 text-primary-DEFAULT rounded focus:ring-primary-DEFAULT"
                            />
                            <label htmlFor="isActive" className="text-gray-700 dark:text-gray-300">Active</label>
                        </div>
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:col-span-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:col-span-2"
                            rows="3"
                        />
                        <div className="md:col-span-2 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Save size={18} />
                                {loading ? 'Saving...' : 'Save Offer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer._id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${offer.isActive ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'} overflow-hidden`}>
                        {offer.image && <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" />}
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 dark:text-white">{offer.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${offer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {offer.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{offer.discountPercentage}% OFF</p>
                            <p className="text-xs text-gray-400 mt-1">Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => startEdit(offer)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(offer._id)}
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

export default OfferManager;
