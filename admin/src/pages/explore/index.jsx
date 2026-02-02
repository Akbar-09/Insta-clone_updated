import React, { useState, useEffect } from 'react';
import { Compass, TrendingUp, Sliders, Hash, Plus, X, Save, BarChart3, Zap, Eye, MousePointerClick, Clock, Maximize, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const ExploreControl = () => {
    const [weights, setWeights] = useState({
        freshnessWeight: 70,
        engagementWeight: 60,
        relevanceWeight: 85,
        locationWeight: 40
    });
    const [trends, setTrends] = useState([]);
    const [categories, setCategories] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [newTopic, setNewTopic] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchData();
        fetchAnalytics();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [configRes, trendsRes] = await Promise.all([
                adminApi.getAlgorithmConfig(),
                adminApi.listTrendingTopics()
            ]);

            if (configRes.success) {
                // Ensure correct state mapping
                setWeights({
                    freshnessWeight: configRes.data.freshnessWeight,
                    engagementWeight: configRes.data.engagementWeight,
                    relevanceWeight: configRes.data.relevanceWeight,
                    locationWeight: configRes.data.locationWeight
                });
            }
            if (trendsRes.success) setTrends(trendsRes.data);
        } catch (error) {
            console.error('Error fetching explore data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const [catRes, perfRes] = await Promise.all([
                adminApi.getCategoryDistribution(),
                adminApi.getPerformanceMetrics()
            ]);
            if (catRes.success) setCategories(catRes.data);
            if (perfRes.success) setMetrics(perfRes.data);
        } catch (error) {
            console.error('Analytics error:', error);
        }
    };

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleWeightChange = (key, value) => {
        setWeights(prev => ({ ...prev, [key]: parseInt(value) }));
    };

    const handleUpdateAlgorithm = async () => {
        try {
            setUpdating(true);
            const res = await adminApi.updateAlgorithmConfig(weights);
            if (res.success) showMessage('Algorithm weights updated successfully!');
        } catch (error) {
            showMessage('Failed to update algorithm', 'error');
        } finally {
            setUpdating(false);
        }
    };

    const handleAddTopic = async () => {
        if (!newTopic.trim()) return;
        try {
            const res = await adminApi.addTrendingTopic(newTopic);
            if (res.success) {
                setTrends([res.data, ...trends]);
                setNewTopic('');
                showMessage('Topic added successfully');
            }
        } catch (error) {
            showMessage(error.response?.data?.message || 'Failed to add topic', 'error');
        }
    };

    const removeTrend = async (id) => {
        try {
            const res = await adminApi.removeTrendingTopic(id);
            if (res.success) {
                setTrends(trends.filter(t => t.id !== id));
            }
        } catch (error) {
            showMessage('Failed to remove topic', 'error');
        }
    };

    const getColor = (index) => {
        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-gray-500'];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-pink-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            {message && (
                <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Discovery</span>
                    <span>•</span>
                    <span className="text-gray-700 dark:text-gray-200">Explore Control</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Compass className="text-pink-500" /> Explore Algorithm Control
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Algorithm Weights */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <Sliders className="text-gray-600 dark:text-gray-300" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Algorithm Weights</h3>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(weights).map(([key, value]) => (
                            <div key={key}>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key.replace('Weight', '')}</label>
                                    <span className="text-sm font-bold text-pink-500">{value}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={value}
                                    onChange={(e) => handleWeightChange(key, e.target.value)}
                                    className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleUpdateAlgorithm}
                            disabled={updating}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {updating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Update Algorithm
                        </button>
                    </div>
                </div>

                {/* Trending Topics Managment */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-blue-500" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Trending Topics</h3>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
                            placeholder="Add topic..."
                            className="flex-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                        />
                        <button
                            onClick={handleAddTopic}
                            className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {trends.map(trend => (
                            <div key={trend.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                    <Hash size={14} className="text-gray-400" /> {trend.topic.replace('#', '')}
                                </span>
                                <button
                                    onClick={() => removeTrend(trend.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-gray-400 mt-4 text-center">
                        These topics are currently pinned to the top of the Explore page.
                    </p>
                </div>
            </div>

            {/* Content Category & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="text-violet-500" size={20} />
                        Category Distribution
                    </h3>
                    <div className="space-y-4">
                        {categories.map((cat, idx) => (
                            <div key={cat.category}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-300">{cat.category}</span>
                                    <span className="font-semibold text-gray-800 dark:text-white">{cat.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${getColor(idx)}`} style={{ width: `${cat.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Algorithmic Performance */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Zap className="text-yellow-500" size={20} />
                        Performance Metrics
                    </h3>
                    {metrics && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 uppercase tracking-wide font-semibold">
                                    <Eye size={14} /> Impressions
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{(metrics.impressions / 1000000).toFixed(1)}M</p>
                                <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${metrics.impressionsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp size={12} className={metrics.impressionsChange < 0 ? 'rotate-180' : ''} />
                                    {metrics.impressionsChange > 0 ? '+' : ''}{metrics.impressionsChange}%
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 uppercase tracking-wide font-semibold">
                                    <MousePointerClick size={14} /> CTR
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.ctr}%</p>
                                <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${metrics.ctrChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp size={12} className={metrics.ctrChange < 0 ? 'rotate-180' : ''} />
                                    {metrics.ctrChange > 0 ? '+' : ''}{metrics.ctrChange}%
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 uppercase tracking-wide font-semibold">
                                    <Clock size={14} /> Avg. Watch
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.avgWatchTime}s</p>
                                <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${metrics.watchTimeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp size={12} className={metrics.watchTimeChange < 0 ? 'rotate-180' : ''} />
                                    {metrics.watchTimeChange > 0 ? '+' : ''}{metrics.watchTimeChange}s
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 uppercase tracking-wide font-semibold">
                                    <Maximize size={14} /> Engagement
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.engagementRate}%</p>
                                <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${metrics.engagementChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp size={12} className={metrics.engagementChange < 0 ? 'rotate-180' : ''} />
                                    {metrics.engagementChange > 0 ? '+' : ''}{metrics.engagementChange}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ExploreControl;
