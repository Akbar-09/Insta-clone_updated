import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { restrictUser } from '../api/userApi';
import { blockUser } from '../api/privacyApi';
import { reportProblem } from '../api/reportApi';
import BlockConfirmModal from './BlockConfirmModal';
import { useAuth } from '../context/AuthContext';

const ProfileOptionsModal = ({ onClose, profile }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showBlockConfirm, setShowBlockConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAction = async (action) => {
        if (loading) return;

        // Auth Check
        const authActions = ['block', 'report', 'restrict'];
        if (authActions.includes(action) && !user) {
            onClose();
            navigate('/login');
            return;
        }

        switch (action) {
            case 'block':
                if (!profile?.userId) {
                    console.error('UserId missing on profile', profile);
                    alert('Cannot block unknown user');
                    onClose();
                    return;
                }
                setShowBlockConfirm(true);
                return;
            case 'report':
                if (window.confirm(`Report ${profile.username}?`)) {
                    alert('Report submitted.');
                }
                onClose();
                return;
            case 'restrict':
                if (window.confirm(`Restrict ${profile.username}?`)) {
                    try {
                        setLoading(true);
                        await restrictUser(profile.userId);
                        alert(`Restricted ${profile.username}`);
                    } catch (e) {
                        console.error(e);
                        alert('Failed to restrict user');
                    } finally {
                        setLoading(false);
                        onClose();
                    }
                }
                onClose();
                return;
            case 'copyProfileUrl':
                const profileUrl = `${window.location.origin}/profile/${profile.username}`;
                await navigator.clipboard.writeText(profileUrl);
                const msg = document.createElement('div');
                msg.textContent = 'Link copied to clipboard';
                msg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                document.body.appendChild(msg);
                setTimeout(() => msg.remove(), 2000);
                onClose();
                return;
            case 'aboutAccount':
                alert(`About ${profile.username}\nJoined: ${new Date(profile.createdAt).toLocaleDateString()}`);
                onClose();
                return;
            default:
                onClose();
        }
    };

    const handleBlockConfirm = async () => {
        if (!profile?.userId) {
            alert('Error: User ID missing');
            setShowBlockConfirm(false);
            onClose();
            return;
        }
        try {
            setLoading(true);
            await blockUser(profile.userId);
            alert(`Blocked ${profile.username}`);
            // Use navigate instead of window.location.href to avoid potential state loss
            navigate('/');
        } catch (error) {
            console.error('Block failed', error);
            if (error.response?.status !== 401) {
                alert('Failed to block user');
            }
        } finally {
            setLoading(false);
            setShowBlockConfirm(false);
            onClose();
        }
    };

    const options = [
        { label: 'Block', className: 'text-red-500 font-bold', action: () => handleAction('block') },
        { label: 'Restrict', className: 'text-red-500 font-bold', action: () => handleAction('restrict') },
        { label: 'Report', className: 'text-red-500 font-bold', action: () => handleAction('report') },
        { label: 'About this account', className: 'text-white', action: () => handleAction('aboutAccount') },
        { label: 'Copy profile URL', className: 'text-white', action: () => handleAction('copyProfileUrl') },
        { label: 'Cancel', className: 'text-white', action: onClose },
    ];

    return ReactDOM.createPortal(
        <>
            {!showBlockConfirm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm animate-fade-in" onClick={onClose}>
                    <div className="bg-[#262626] w-[400px] rounded-xl overflow-hidden shadow-xl animate-zoom-in" onClick={e => e.stopPropagation()}>
                        {loading && (
                            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            </div>
                        )}
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={option.action}
                                disabled={loading}
                                className={`w-full py-3.5 text-sm border-b border-[#363636] last:border-none hover:bg-white/5 transition-colors ${option.className} disabled:opacity-50`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <BlockConfirmModal
                isOpen={showBlockConfirm}
                onClose={() => setShowBlockConfirm(false)}
                onConfirm={handleBlockConfirm}
                username={profile.username}
            />
        </>,
        document.body
    );
};

export default ProfileOptionsModal;
