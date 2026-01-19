
import { forwardRef } from 'react';

const NOTIFICATIONS = [
    {
        section: 'This week', items: [
            { id: 1, type: 'like', user: { username: 'faiz_09_fz', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=56&h=56&fit=crop' }, text: 'ramiz_shaikh44 and 53 others liked your post.', time: '3d', postImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop' },
            { id: 2, type: 'follow', user: { username: 'faiz_09_fz', avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=56&h=56&fit=crop' }, text: 'started following you.', time: '3d', isFollowing: true },
            { id: 3, type: 'comment_like', user: { username: 'ayuu.rx_2405', avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=56&h=56&fit=crop' }, text: 'liked your comment: Back conditioning 🔥🔥', time: '4d', postImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=50&h=50&fit=crop' },
            { id: 4, type: 'reply', user: { username: 'qasim__fitness', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=56&h=56&fit=crop' }, text: 'replied to your comment on qasim__fitness\'s post: @khan_akbar__09 txy', time: '5d', postImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=50&h=50&fit=crop' }
        ]
    },
    {
        section: 'This month', items: [
            { id: 5, type: 'suggested_follow', user: { username: 'shaikhmuhammad', name: 'shaikhmuhammadsiddiquie', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=56&h=56&fit=crop' }, text: 'who you might know, is on Jaadoe.', time: '26 Dec' },
            { id: 6, type: 'follow', user: { username: 'khurshidfitnees', avatar: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=56&h=56&fit=crop' }, text: 'started following you.', time: '25 Dec', isFollowing: true },
            { id: 7, type: 'comment_like', user: { username: 'vajidansari_', avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=56&h=56&fit=crop' }, text: 'liked your comment: 🔥💯', time: '14 Dec', postImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop' }
        ]
    },
    {
        section: 'Earlier', items: [
            { id: 8, type: 'comment_like', user: { username: 'fit.x_vazid', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?w=56&h=56&fit=crop' }, text: 'and vajidansari_ liked your comment: Back 🔥🔥', time: '09 Dec', postImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop' }
        ]
    }
];

const NotificationsDrawer = forwardRef(({ isOpen }, ref) => {
    if (!isOpen) return null;

    return (
        <div ref={ref} className="absolute top-0 left-[72px] bottom-0 w-[397px] bg-primary border-r border-border rounded-r-2xl p-0 z-[99] shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col transition-all duration-300">
            <div className="px-6 pt-6 pb-3">
                <h2 className="text-2xl font-bold">Notifications</h2>
            </div>

            <div className="flex-grow overflow-y-auto pb-5">
                {NOTIFICATIONS.map((group, idx) => (
                    <div key={idx} className="flex flex-col border-b border-border last:border-b-0">
                        <h3 className="text-base font-bold px-6 pt-5 pb-3">{group.section}</h3>
                        {group.items.map(item => (
                            <div key={item.id} className="flex items-center px-6 py-3 cursor-pointer hover:bg-secondary">
                                <div className="mr-3.5 shrink-0">
                                    <img src={item.user.avatar} className="w-11 h-11 rounded-full object-cover" alt={item.user.username} />
                                </div>

                                <div className="flex-grow mr-3 text-sm leading-[1.4]">
                                    <span className="text-text-primary">
                                        <span className="font-semibold text-text-primary">{item.user.username}</span>
                                        {' '}{item.text}
                                        <span className="text-text-secondary"> {item.time}</span>
                                    </span>
                                </div>

                                <div className="shrink-0">
                                    {item.isFollowing ? (
                                        <button className="bg-secondary text-text-primary border-none px-4 py-[7px] rounded-lg font-semibold text-sm cursor-pointer hover:bg-[#dbdbdb] transition-colors">Following</button>
                                    ) : item.type === 'suggested_follow' ? (
                                        <button className="bg-blue-btn text-white border-none px-5 py-[7px] rounded-lg font-semibold text-sm cursor-pointer hover:bg-blue-btn-hover transition-colors">Follow</button>
                                    ) : item.postImage ? (
                                        <img src={item.postImage} className="w-11 h-11 object-cover rounded" alt="Post" />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

NotificationsDrawer.displayName = 'NotificationsDrawer';

export default NotificationsDrawer;
