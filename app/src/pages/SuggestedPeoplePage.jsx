import { useState, useEffect } from 'react';
import { getSuggestions } from '../api/profileApi';
import UserCard from '../components/UserCard'; // Assuming UserCard can be reused or create a list item version
import Layout from '../components/Layout';

const SuggestedPeoplePage = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                // Fetch more suggestions for this page
                const res = await getSuggestions(30);
                if (res.status === 'success') {
                    const mapped = res.data.map(u => ({
                        id: u.userId,
                        username: u.username,
                        name: u.fullName || u.username,
                        avatar: u.profilePicture,
                        mutual: 'Suggested for you', // Backend should provide mutual count
                        type: 'USER',
                        isFollowing: u.isFollowing
                    }));
                    setSuggestions(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch suggested people", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <div className="flex flex-col w-full max-w-[600px] mx-auto pt-8 pb-10">
            <h1 className="text-xl font-semibold mb-4 text-text-primary px-4">Suggested for you</h1>
            <div className="bg-white dark:bg-black rounded-lg flex flex-col gap-2">
                {loading ? (
                    <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div></div>
                ) : suggestions.length > 0 ? (
                    suggestions.map(user => (
                        <div key={user.id} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-md">
                            <UserCard user={user} subtitle={user.mutual} />
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-text-secondary">No suggestions found.</div>
                )}
            </div>
        </div>
    );
};

export default SuggestedPeoplePage;
