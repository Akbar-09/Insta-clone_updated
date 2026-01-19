import { useState } from 'react';
import { Lock, ChevronRight, MessageCircle, AtSign, MessageSquare, Repeat, Shield, VolumeX, EyeOff, Users } from 'lucide-react';

const PrivacySettings = () => {
    const [isPrivate, setIsPrivate] = useState(false);

    const PrivacyItem = ({ icon: Icon, label }) => (
        <div className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
            <div className="flex items-center">
                {Icon && <Icon size={24} className="mr-4 text-text-primary stroke-1" />}
                <span className="text-base text-text-primary">{label}</span>
            </div>
            <ChevronRight size={20} className="text-text-secondary" />
        </div>
    );

    return (
        <div className="flex flex-col w-full text-text-primary">
            <h2 className="text-xl font-bold mb-8 mt-1">Account privacy</h2>

            <div className="flex items-top justify-between mb-8 pb-8 border-b border-[#dbdbdb] dark:border-[#363636]">
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
                        onChange={() => setIsPrivate(!isPrivate)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
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
        </div>
    );
};

export default PrivacySettings;
