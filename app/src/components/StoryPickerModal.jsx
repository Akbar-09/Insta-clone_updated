import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import ReactDOM from 'react-dom';
import { getMyStories } from '../api/highlightApi';
import { createHighlight } from '../api/highlightApi';

const StoryPickerModal = ({ highlightName, onClose, onSuccess }) => {
    const [stories, setStories] = useState([]);
    const [selectedStories, setSelectedStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        setLoading(true);
        try {
            const response = await getMyStories();
            if (response.status === 'success') {
                setStories(response.data);
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStory = (storyId) => {
        setSelectedStories(prev => {
            if (prev.includes(storyId)) {
                return prev.filter(id => id !== storyId);
            } else {
                return [...prev, storyId];
            }
        });
    };

    const handleCreate = async () => {
        if (selectedStories.length === 0) return;

        setCreating(true);
        try {
            const response = await createHighlight(highlightName, selectedStories);
            if (response.status === 'success') {
                if (onSuccess) {
                    onSuccess(selectedStories);
                }
            }
        } catch (error) {
            console.error('Error creating highlight:', error);
            alert('Failed to create highlight');
        } finally {
            setCreating(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays}d ago`;
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#262626] w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl animate-zoom-in flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="border-b border-[#363636] px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-70 transition-opacity"
                        disabled={creating}
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-white font-semibold text-base absolute left-1/2 transform -translate-x-1/2">
                        {highlightName}
                    </h2>
                    <button
                        onClick={handleCreate}
                        disabled={selectedStories.length === 0 || creating}
                        className={`text-sm font-semibold transition-opacity ${selectedStories.length > 0 && !creating
                                ? 'text-[#0095F6] hover:text-white cursor-pointer'
                                : 'text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        {creating ? 'Creating...' : 'Done'}
                    </button>
                </div>

                {/* Stories Grid */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                    ) : stories.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">No stories yet</h3>
                                    <p className="text-sm">Create some stories to add them to highlights</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-white text-sm mb-3">
                                Select stories ({selectedStories.length} selected)
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {stories.map((story) => {
                                    const isSelected = selectedStories.includes(story.id);
                                    const isExpired = new Date(story.expiresAt) < new Date();

                                    return (
                                        <div
                                            key={story.id}
                                            onClick={() => toggleStory(story.id)}
                                            className="relative aspect-[9/16] cursor-pointer group overflow-hidden rounded-lg"
                                        >
                                            {/* Story Image */}
                                            <img
                                                src={story.mediaUrl}
                                                alt="Story"
                                                className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-70' : 'opacity-100'
                                                    }`}
                                            />

                                            {/* Date Badge */}
                                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                                {formatDate(story.createdAt)}
                                            </div>

                                            {/* Expired Badge */}
                                            {isExpired && (
                                                <div className="absolute bottom-2 left-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
                                                    Expired
                                                </div>
                                            )}

                                            {/* Selection Overlay */}
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <div className="w-10 h-10 rounded-full bg-[#0095F6] flex items-center justify-center">
                                                        <Check size={24} className="text-white" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hover Effect */}
                                            {!isSelected && (
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default StoryPickerModal;
