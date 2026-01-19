import { Settings, Check } from 'lucide-react';

const ProfileHeader = ({ profile, postsCount, isOwnProfile, isFollowing, onFollowToggle }) => {

    const VerifiedBadge = () => (
        <svg aria-label="Verified" className="ml-2 w-[18px] h-[18px] text-[#0095f6]" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
            <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6 6.162-3.137v-5.905L40 25.359 36.905 20 40 14.641l-5.248-3.137V5.15h-6.162l-3.232-5.6Z" fillRule="evenodd"></path>
            <path d="M24.509 15.385l-6.421 6.421-3.978-3.978-1.528 1.528 5.506 5.506L26.037 16.913z" fill="#fff" fillRule="nonzero"></path>
        </svg>
    );

    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return url;
    };

    return (
        <header className="flex mb-11 px-10 max-md:px-4 max-md:mb-6 max-md:mt-4 items-start">
            {/* Avatar Section */}
            <div className="flex-grow flex-basis-0 mr-[30px] flex justify-center max-md:flex-grow-0 max-md:mr-5">
                <div className="relative">
                    {/* "Note..." Bubble */}
                    {isOwnProfile && (
                        <div className="absolute -top-10 left-12 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 text-xs font-semibold text-white animate-bounce-slow cursor-pointer hover:bg-white/20 transition-colors">
                            Note...
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white/10 rotate-45 transform"></div>
                        </div>
                    )}
                    <div className="w-[150px] h-[150px] rounded-full p-[2px] bg-gradient-to-tr from-[#FFD600] via-[#FF0169] to-[#D300C5] max-md:w-[77px] max-md:h-[77px] group cursor-pointer">
                        <div className="w-full h-full rounded-full p-[2px] bg-black">
                            <img
                                src={getMediaUrl(profile.avatar) || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+'}
                                alt={profile.username}
                                className="w-full h-full rounded-full object-cover group-hover:opacity-90 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="flex-grow-[2] flex-basis-[30px] flex flex-col pt-2 max-md:pt-0">

                {/* Top Row: Username and Actions */}
                <div className="flex items-center mb-5 max-md:flex-col max-md:items-start max-md:mb-3">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center">
                            <h2 className="text-[20px] font-normal leading-8 text-text-primary mr-2">{profile.username}</h2>
                            {profile.isVerified && <VerifiedBadge />}
                        </div>

                        <div className="flex items-center gap-2 max-md:mt-4 max-md:w-full">
                            {isOwnProfile ? (
                                <>
                                    <button className="bg-[#efefef] dark:bg-[#363636] hover:bg-[#dbdbdb] dark:hover:bg-[#262626] text-black dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors">Edit profile</button>
                                    <button className="bg-[#efefef] dark:bg-[#363636] hover:bg-[#dbdbdb] dark:hover:bg-[#262626] text-black dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors">View archive</button>
                                    <Settings size={24} className="ml-2 cursor-pointer text-text-primary hover:rotate-90 transition-transform duration-300" />
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={onFollowToggle}
                                        className={`${isFollowing ? 'bg-[#efefef] dark:bg-[#363636] text-black dark:text-white' : 'bg-[#0095f6] hover:bg-[#1877f2] text-white'} px-6 py-[7px] rounded-lg font-semibold text-sm transition-colors flex items-center justify-center min-w-[100px]`}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                    <button className="bg-[#efefef] dark:bg-[#363636] hover:bg-[#dbdbdb] dark:hover:bg-[#262626] text-black dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors">Message</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Middle Row: Stats */}
                <div className="flex mb-5 text-base max-md:hidden text-text-primary">
                    <span className="mr-10"><span className="font-semibold">{postsCount}</span> posts</span>
                    <span className="mr-10 cursor-pointer hover:opacity-70"><span className="font-semibold">{profile.followersCount || 0}</span> followers</span>
                    <span className="cursor-pointer hover:opacity-70"><span className="font-semibold">{profile.followingCount || 0}</span> following</span>
                </div>

                {/* Bottom Row: Bio */}
                <div className="text-sm leading-5 text-text-primary">
                    <span className="font-semibold block mb-1">{profile.fullname}</span>
                    <div className="whitespace-pre-wrap">{profile.bio}</div>
                </div>
            </div>
        </header>
    );
};

export default ProfileHeader;
