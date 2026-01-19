import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getSavedPosts } from '../../api/bookmarkApi';
import ProfileGrid from './ProfileGrid';

const SavedPosts = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            // In a real app, 'me' or user.id would be used.
            // Our API expects userId as query param or we can update it to infer from token.
            // For now passing user.id explicitly as per our previous backend implementation.
            if (!user) return;
            try {
                const data = await getSavedPosts(user.id || user.userId);
                if (data.status === 'success') {
                    setPosts(data.data);
                } else if (Array.isArray(data)) {
                    // Fallback in case API returns array directly
                    setPosts(data);
                }
            } catch (error) {
                console.error("Failed to fetch saved posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSaved();
    }, [user]);

    if (loading) return <div className="flex justify-center py-20 text-text-primary">Loading...</div>;

    if (posts.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center text-center text-text-secondary">
                <div className="w-[62px] h-[62px] border-2 border-text-primary rounded-full flex items-center justify-center mb-4">
                    <svg aria-label="Save" className="_ab6-" color="currentColor" fill="currentColor" height="30" role="img" viewBox="0 0 24 24" width="30">
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                    </svg>
                </div>
                <h2 className="text-xl font-extrabold mb-2 text-text-primary">Save</h2>
                <p className="text-sm max-w-[350px]">Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="text-xs text-text-secondary font-semibold mb-4 mt-2">Only you can see what you've saved</div>
            <ProfileGrid posts={posts} />
        </div>
    );
};

export default SavedPosts;
