import { useState, useEffect, useContext } from 'react';
import { Lock, ChevronRight, MessageCircle, AtSign, MessageSquare, Repeat, Shield, VolumeX, EyeOff, Users, Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getUserById, updateUserProfile } from '../../api/userApi';
import AccountPrivacyModal from './AccountPrivacyModal';

const PrivacySettings = () => {
    const { user, setUser } = useContext(AuthContext); // Assuming setUser can update context
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
                        // Default to true if undefined
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
            // Public -> Private: Show confirmation
            setShowConfirmModal(true);
        } else {
            // Private -> Public: Immediate switch
            updatePrivacy(false);
        }
    };

    const confirmSwitchPrivate = () => {
        updatePrivacy(true);
        setShowConfirmModal(false);
    };

    const updatePrivacy = async (privateStatus) => {
        const oldState = isPrivate;
        setIsPrivate(privateStatus); // Optimistic

        try {
            const userId = user.id || user.userId;
            await updateUserProfile(userId, { isPrivate: privateStatus });
            // Update context if needed
            if (setUser) setUser(prev => ({ ...prev, isPrivate: privateStatus }));
        } catch (err) {
            console.error("Failed to update privacy", err);
            setIsPrivate(oldState); // Revert
            // Optional: Show toast error
        }
    };

    const handleIndexingToggle = async () => {
        const newState = !allowIndexing;
        setAllowIndexing(newState); // Optimistic

        try {
            const userId = user.id || user.userId;
            await updateUserProfile(userId, { allowSearchIndexing: newState });
        } catch (err) {
            console.error("Failed to update indexing settings", err);
            setAllowIndexing(!newState); // Revert
        }
    };

    const PrivacyItem = ({ icon: Icon, label }) => (
        <div className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
            <div className="flex items-center">
                {Icon && <Icon size={24} className="mr-4 text-text-primary stroke-1" />}
                <span className="text-base text-text-primary">{label}</span>
            </div>
            <ChevronRight size={20} className="text-text-secondary" />
        </div>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary max-w-2xl px-4 md:px-0 pb-10">
            <h2 className="text-xl font-bold mb-8 mt-1">Account privacy</h2>

            {/* Private Account Toggle */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#dbdbdb] dark:border-[#363636]">
                <div className="mr-8">
                    <span className="text-base font-medium block mb-3">Private account</span>
                    <p className="text-sm text-text-secondary leading-5">
                        When your account is public, your profile and posts can be seen by anyone, on or off Jaadoe, even if they don't have a Jaadoe account.
                    </p>
                    <p className="text-sm text-text-secondary leading-5 mt-4">
                        When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists.
                    </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={handlePrivacyToggle}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>

            {/* Search Engine Visibility (Matches Instagram's phrasing roughly) */}
            {/* Note: In real Instagram this is often inside 'Activity Status' or similar depending on region, but user asked for it. */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#dbdbdb] dark:border-[#363636]">
                <div className="mr-8">
                    <span className="text-base font-medium block mb-3">Include my account in search results</span>
                    <p className="text-sm text-text-secondary leading-5">
                        Allow people to find you by searching for your name or username in search engines.
                    </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                        type="checkbox"
                        checked={allowIndexing}
                        onChange={handleIndexingToggle}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>


            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-4">Interactions</h3>

            <div className="flex flex-col mb-8">
                <PrivacyItem icon={MessageCircle} label="Messages" />
                <PrivacyItem icon={AtSign} label="Tags and mentions" />
                <PrivacyItem icon={MessageSquare} label="Comments" />
                <PrivacyItem icon={Repeat} label="Sharing and remixes" />
                <PrivacyItem icon={Shield} label="Restricted accounts" />
                <PrivacyItem icon={VolumeX} label="Hidden Words" />
            </div>

            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-4">Connections</h3>
            <div className="flex flex-col">
                <PrivacyItem icon={VolumeX} label="Muted accounts" />
                <PrivacyItem icon={EyeOff} label="Like and share counts" />
                <PrivacyItem icon={Users} label="Profiles you follow" />
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
