import { useState, useEffect, useContext } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getUserById, updateUserProfile } from '../../api/userApi';
import AccountPrivacyModal from './AccountPrivacyModal';

const PrivacySettings = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [allowIndexing, setAllowIndexing] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            if (user?.id || user?.userId) {
                try {
                    const userId = user.id || user.userId;
                    const res = await getUserById(userId);
                    if (res.status === 'success') {
                        setIsPrivate(res.data.isPrivate);
                        setAllowIndexing(res.data.allowSearchIndexing !== undefined ? res.data.allowSearchIndexing : true);
                    }
                } catch (err) {
                    console.error("Failed to load privacy settings", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchSettings();
    }, [user]);

    const handlePrivacyToggle = () => {
        if (!isPrivate) {
            setShowConfirmModal(true);
        } else {
            updatePrivacy(false);
        }
    };

    const confirmSwitchPrivate = () => {
        updatePrivacy(true);
        setShowConfirmModal(false);
    };

    const updatePrivacy = async (privateStatus) => {
        const oldState = isPrivate;
        setIsPrivate(privateStatus);

        try {
            const userId = user.id || user.userId;
            await updateUserProfile(userId, { isPrivate: privateStatus });
            if (setUser) setUser(prev => ({ ...prev, isPrivate: privateStatus }));
        } catch (err) {
            console.error("Failed to update privacy", err);
            setIsPrivate(oldState);
        }
    };

    const handleIndexingToggle = async () => {
        const newState = !allowIndexing;
        setAllowIndexing(newState);

        try {
            const userId = user.id || user.userId;
            await updateUserProfile(userId, { allowSearchIndexing: newState });
        } catch (err) {
            console.error("Failed to update indexing settings", err);
            setAllowIndexing(!newState);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary max-w-2xl mx-auto px-4 md:px-0 pb-10">
            <h2 className="text-xl font-bold mb-8 mt-1 text-center md:text-left">Account privacy</h2>

            <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl p-6 shadow-sm">
                {/* Private Account Section */}
                <div className="flex items-start justify-between pb-6 border-b border-border">
                    <div className="mr-8">
                        <span className="text-base font-medium block mb-2">Private account</span>
                        <p className="text-sm text-text-secondary leading-normal mb-3">
                            When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don't have an Instagram account.
                        </p>
                        <p className="text-sm text-text-secondary leading-normal">
                            When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Certain info on your profile, such as your profile picture and username, is visible to everyone on and off Instagram. <span className="text-blue-500 cursor-pointer">Learn more</span>
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={handlePrivacyToggle}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                    </label>
                </div>

                {/* Search Engine Visibility Section */}
                <div className="flex items-start justify-between pt-6">
                    <div className="mr-8">
                        <span className="text-base font-medium block mb-2">Allow public photos and videos to appear in search engine results</span>
                        <p className="text-sm text-text-secondary leading-normal">
                            When this is on, search engines such as Google can show your public photos and videos in search results outside of Instagram. When this is off, links to your publicly shared content can still appear in search results. <span className="text-blue-500 cursor-pointer">Learn more</span>
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input
                            type="checkbox"
                            checked={allowIndexing}
                            onChange={handleIndexingToggle}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                    </label>
                </div>
            </div>

            <AccountPrivacyModal
                isSwitchingToPrivate={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmSwitchPrivate}
            />
        </div>
    );
};

export default PrivacySettings;
