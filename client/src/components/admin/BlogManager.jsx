import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '', content: '', author: '', tags: '', image: '', slug: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/blog');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Failed to load blog posts');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        try {
            if (currentPost) {
                await api.put(`/blog/${currentPost._id}`, dataToSend);
                toast.success('Post updated successfully');
            } else {
                await api.post('/blog', dataToSend);
                toast.success('Post created successfully');
            }
            await fetchPosts();
            resetForm();
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/blog/${id}`);
                toast.success('Post deleted successfully');
                fetchPosts();
            } catch (error) {
                console.error('Error deleting post:', error);
                toast.error('Failed to delete post');
            }
        }
    };

    const startEdit = (post) => {
        setCurrentPost(post);
        setFormData({
            ...post,
            tags: post.tags.join(', ')
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setCurrentPost(null);
        setFormData({ title: '', content: '', author: '', tags: '', image: '', slug: '' });
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Blog Posts</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> Add Post
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {currentPost ? 'Edit Post' : 'New Post'}
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
                            type="text"
                            placeholder="Slug (e.g., my-new-post)"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:col-span-2"
                        />
                        <textarea
                            placeholder="Content (HTML supported)"
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:col-span-2"
                            rows="6"
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
                                {loading ? 'Saving...' : 'Save Post'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">{post.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(post.createdAt).toLocaleDateString()} • {post.author}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => startEdit(post)}
                                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogManager;
