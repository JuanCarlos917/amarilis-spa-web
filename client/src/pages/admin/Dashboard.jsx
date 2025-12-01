import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles, Tag, FileText, Settings, LogOut, User } from 'lucide-react';
import api from '../../api/axios';

import ServiceManager from '../../components/admin/ServiceManager';
import OfferManager from '../../components/admin/OfferManager';
import BlogManager from '../../components/admin/BlogManager';
import SiteInfoManager from './SiteInfoManager';
import ProfileSettings from './ProfileSettings';

const Overview = () => (
    <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Select a section from the sidebar to manage content.</p>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [username, setUsername] = useState('Admin'); // State for username

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProfile(); // Fetch profile on load
        }
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/profile');
            if (res.data.username) {
                setUsername(res.data.username);
            }
        } catch (error) {
            console.error('Error fetching profile for dashboard:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: Overview },
        { id: 'services', label: 'Services', icon: Sparkles, component: ServiceManager },
        { id: 'offers', label: 'Offers', icon: Tag, component: OfferManager },
        { id: 'blog', label: 'Blog', icon: FileText, component: BlogManager },
        { id: 'info', label: 'Site Info', icon: Settings, component: SiteInfoManager },
        { id: 'settings', label: 'Profile Settings', icon: User, component: ProfileSettings },
    ];

    const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || Overview;

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-serif font-bold text-primary-DEFAULT dark:text-primary-light">Admin Panel</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Hello, {username} 👋</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                ? 'bg-primary-DEFAULT text-white shadow-md'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 capitalize">
                        {menuItems.find(item => item.id === activeTab)?.label}
                    </h1>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                        <ActiveComponent />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
