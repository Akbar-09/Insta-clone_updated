import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getUserHighlights } from '../../api/highlightApi';
import NewHighlightModal from '../../components/NewHighlightModal';
import HighlightViewer from '../../components/HighlightViewer';

const HighlightsRow = ({ userId, isOwnProfile }) => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewModal, setShowNewModal] = useState(false);
    const [selectedHighlight, setSelectedHighlight] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchHighlights();
        }
    }, [userId]);

    const fetchHighlights = async () => {
        setLoading(true);
        try {
            const response = await getUserHighlights(userId);
            if (response.status === 'success') {
                setHighlights(response.data);
            }
        } catch (error) {
            console.error('Error fetching highlights:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewHighlight = () => {
        setShowNewModal(true);
    };

    const handleHighlightCreated = () => {
        setShowNewModal(false);
        fetchHighlights(); // Refresh highlights
    };

    const handleHighlightClick = (highlight) => {
        setSelectedHighlight(highlight);
    };

    if (loading) {
        return (
            <div className="border-t border-[#363636] py-4 px-10 max-md:px-4">
                <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse"></div>
                            <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!isOwnProfile && highlights.length === 0) {
        return null; // Don't show anything if not own profile and no highlights
    }

    return (
        <>
            <div className="py-4 px-10 max-md:px-4">
                <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
                    {/* New Highlight Button (only for own profile) */}
                    {isOwnProfile && (
                        <div
                            onClick={handleNewHighlight}
                            className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-[#363636] flex items-center justify-center group-hover:border-gray-500 transition-colors">
                                <Plus size={32} className="text-white" />
                            </div>
                            <span className="text-xs text-white max-w-[80px] truncate">New</span>
                        </div>
                    )}

                    {/* Highlight Circles */}
                    {highlights.map((highlight) => (
                        <div
                            key={highlight.id}
                            onClick={() => handleHighlightClick(highlight)}
                            className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
                        >
                            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-gray-600 to-gray-400 group-hover:from-gray-500 group-hover:to-gray-300 transition-all">
                                <div className="w-full h-full rounded-full p-[2px] bg-black">
                                    {highlight.coverStory?.mediaUrl ? (
                                        <img
                                            src={highlight.coverStory.mediaUrl}
                                            alt={highlight.title}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <span className="text-white text-2xl font-bold">
                                                {highlight.title[0].toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-white max-w-[80px] truncate">
                                {highlight.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {showNewModal && (
                <NewHighlightModal
                    onClose={() => setShowNewModal(false)}
                    onSuccess={handleHighlightCreated}
                />
            )}

            {selectedHighlight && (
                <HighlightViewer
                    highlight={selectedHighlight}
                    onClose={() => setSelectedHighlight(null)}
                />
            )}
        </>
    );
};

export default HighlightsRow;
