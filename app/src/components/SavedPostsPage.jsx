import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSavedPosts } from '../api/bookmarkApi';
import ProfileGrid from './profile/ProfileGrid'; // Reuse existing grid

const SavedPostsPage = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user) return;
            try {
                const data = await getSavedPosts(user.id || user.userId);
                // API wrapper returns data directly if success, check adapter
                if (data.status === 'success') {
                    setPosts(data.data);
                } else if (Array.isArray(data)) {
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

    if (loading) return <div className="flex justify-center p-10 text-white">Loading...</div>;

    return (
        <div className="w-full max-w-[935px] mx-auto py-8">
            <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Only you can see what you've saved</h2>
                {/* Could add 'New Collection' button here */}
            </div>
            <ProfileGrid posts={posts} />
        </div>
    );
};

export default SavedPostsPage;
