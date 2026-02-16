import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const MessagesReplies = () => {
    const navigate = useNavigate();

    const sections = [
        { label: 'Message controls', path: '/settings/messages_replies/controls' },
        { label: 'Story replies', path: '/settings/messages_replies/story_replies' },
        { label: 'Show activity status', path: '/settings/messages_replies/activity_status' },
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Messages and story replies</h2>
            </div>
            <p className="text-sm text-text-secondary mb-6">Manage how people allow to message you.</p>

            <div className="flex flex-col">
                {sections.map((item) => (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                    >
                        <span className="text-base text-text-primary">{item.label}</span>
                        <ChevronRight size={20} className="text-text-secondary" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesReplies;
