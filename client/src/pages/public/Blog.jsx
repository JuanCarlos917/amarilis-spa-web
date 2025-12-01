import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/blog');
                setPosts(res.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background-light dark:bg-background-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-center text-primary-DEFAULT dark:text-primary-light mb-12">
                    Wellness Blog
                </h1>

                {loading ? (
                    <div className="text-center text-text-light dark:text-text-dark">Loading...</div>
                ) : (
                    <div className="space-y-12">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                            >
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 md:h-96 object-cover"
                                    />
                                )}
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                                        {post.title}
                                    </h2>
                                    <div
                                        className="prose dark:prose-invert max-w-none mb-6 text-text-light dark:text-text-dark opacity-80"
                                        dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="bg-secondary-light dark:bg-secondary-dark text-secondary-dark dark:text-secondary-light px-3 py-1 rounded-full text-sm">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
