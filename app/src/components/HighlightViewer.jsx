import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getHighlightStories } from '../api/highlightApi';
import StoryViewer from './StoryViewer';

const HighlightViewer = ({ highlight, onClose }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, [highlight]);

    const fetchStories = async () => {
        setLoading(true);
        try {
            const response = await getHighlightStories(highlight.id);
            if (response.status === 'success') {
                setStories(response.data.stories);
            }
        } catch (error) {
            console.error('Error fetching highlight stories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return ReactDOM.createPortal(
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>,
            document.body
        );
    }

    if (stories.length === 0) {
        return null;
    }

    // Reuse StoryViewer for exact UI match
    // StoryViewer handles its own portals, so we just render it
    return (
        <StoryViewer
            stories={stories}
            activeIndex={0}
            onClose={onClose}
        />
    );
};

export default HighlightViewer;
