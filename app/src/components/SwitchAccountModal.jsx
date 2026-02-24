import { X, Check, Plus } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProxiedUrl } from '../utils/mediaUtils';

const SwitchAccountModal = ({ onClose }) => {
    const { user, sessions, switchAccount } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSwitch = (userId) => {
        switchAccount(userId);
        onClose();
    };

    const handleLoginNew = () => {
        navigate('/login');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-[400px] bg-white dark:bg-[#262626] rounded-xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="h-[43px] border-b border-border dark:border-[#363636] flex items-center justify-center relative">
                    <span className="font-semibold text-base text-text-primary">Switch accounts</span>
                    <button onClick={onClose} className="absolute right-3 top-2.5 p-1 text-text-primary">
                        <X size={24} />
                    </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {sessions && sessions.length > 0 ? (
                        sessions.map(session => (
                            <div
                                key={session.userId}
                                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                onClick={() => handleSwitch(session.userId)}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={getProxiedUrl(session.profilePicture) || `https://ui-avatars.com/api/?name=${session.username}&background=random`}
                                        alt={session.username}
                                        className="w-10 h-10 rounded-full object-cover mr-3 border border-border"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-text-primary">{session.username}</span>
                                    </div>
                                </div>
                                {(user.id === session.userId || user.userId === session.userId) && (
                                    <Check size={24} className="text-blue-500" />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 flex items-center">
                            <img
                                src={getProxiedUrl(user?.profilePicture) || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                                alt={user?.username}
                                className="w-10 h-10 rounded-full object-cover mr-3 border border-border"
                            />
                            <span className="text-sm font-semibold text-text-primary">{user?.username}</span>
                            <Check size={24} className="text-blue-500 ml-auto" />
                        </div>
                    )}
                </div>

                <div className="border-t border-border dark:border-[#363636] p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={handleLoginNew}>
                    <div className="flex items-center text-[#0095f6] font-semibold text-sm">
                        <Plus size={20} className="mr-2" />
                        Log into an existing account
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchAccountModal;
