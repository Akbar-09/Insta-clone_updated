import React, { useState } from 'react';
import { Compass, TrendingUp, Sliders, Hash, Plus, X, Save } from 'lucide-react';

const ExploreControl = () => {
    const [weights, setWeights] = useState({
        freshness: 70,
        engagement: 60,
        relevance: 85,
        location: 40
    });

    const [trends, setTrends] = useState([
        '#summer2026', '#techtrends', 'World Cup', 'New Music Friday'
    ]);

    const [newTopic, setNewTopic] = useState('');

    const handleWeightChange = (key, value) => {
        setWeights(prev => ({ ...prev, [key]: value }));
    };

    const removeTrend = (trend) => {
        setTrends(trends.filter(t => t !== trend));
    };

    const handleAddTopic = () => {
        if (!newTopic.trim()) return;
        const topic = newTopic.startsWith('#') || newTopic.includes(' ') ? newTopic : `#${newTopic}`;
        if (!trends.includes(topic)) {
            setTrends([topic, ...trends]);
        }
        setNewTopic('');
    };

    const handleUpdateAlgorithm = () => {
        // In a real app, this would make an API call
        alert('Algorithm weights updated successfully!');
    };

    return (
        <div className="space-y-6">
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
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key}</label>
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
                            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity"
                        >
                            <Save size={18} /> Update Algorithm
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

                    <div className="space-y-2">
                        {trends.map(trend => (
                            <div key={trend} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                    <Hash size={14} className="text-gray-400" /> {trend.replace('#', '')}
                                </span>
                                <button
                                    onClick={() => removeTrend(trend)}
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

            {/* Featured Grid Preview */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Featured Grid Preview</h3>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 h-48 overflow-hidden opacity-80 pointer-events-none">
                    {/* Generating a fake grid visual */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`bg-gray-200 dark:bg-white/10 rounded-lg ${i % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreControl;
