import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProxiedUrl } from '../../utils/urlUtils';
import { getArchivedStories } from '../../api/highlightApi';

const ArchivePage = () => {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArchive();
    }, []);

    const fetchArchive = async () => {
        setLoading(true);
        try {
            const response = await getArchivedStories();
            // Assuming response is already data array due to API wrapper or adjusting here
            // The API function returns response.data, and backend sends { status: 'success', data: [...] }
            if (Array.isArray(response)) {
                setStories(response);
            } else if (response.data) {
                setStories(response.data);
            }
        } catch (error) {
            console.error('Error fetching archive:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const groupStoriesByMonth = (stories) => {
        const groups = {};
        stories.forEach(story => {
            const date = new Date(story.createdAt);
            const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[key]) groups[key] = [];
            groups[key].push(story);
        });
        return groups;
    };



    return (
        <div className="min-h-screen bg-black text-white w-full max-w-[935px] mx-auto pt-4">
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-[#363636] sticky top-0 bg-black z-10">
                <button onClick={() => navigate(-1)} className="mr-4 hover:opacity-70">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1">
                    <div className="text-sm text-gray-400">Archive</div>
                    <h1 className="text-xl font-bold">Stories Archive</h1>
                </div>
                <button className="hover:opacity-70">
                    <Calendar size={24} />
                </button>
            </div>

            {/* Grid */}
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : stories.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <h2 className="text-xl font-bold mb-2">No archived stories</h2>
                        <p>Stories you create will appear here after they expire.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-1 md:gap-4 md:grid-cols-4 lg:grid-cols-5">
                        {stories.map((story) => (
                            <div key={story.id} className="relative aspect-[9/16] bg-[#262626] rounded overflow-hidden cursor-pointer group">
                                <img
                                    src={getProxiedUrl(story.mediaUrl)}
                                    alt="Archived Story"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://ui-avatars.com/api/?name=Story&background=262626&color=555&size=512&semibold=true&format=svg';
                                    }}
                                />

                                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">
                                    {formatDate(story.createdAt)}
                                </div>
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArchivePage;
