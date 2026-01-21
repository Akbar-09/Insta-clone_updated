import ReactDOM from 'react-dom';

const ProfileOptionsModal = ({ onClose }) => {
    const options = [
        { label: 'Block', className: 'text-red-500 font-bold', action: () => alert('Block user') },
        { label: 'Restrict', className: 'text-red-500 font-bold', action: () => alert('Restrict user') },
        { label: 'Report', className: 'text-red-500 font-bold', action: () => alert('Report user') },
        { label: 'About this account', className: 'text-white', action: () => alert('About this account') },
        {
            label: 'Copy profile URL', className: 'text-white', action: () => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
                onClose();
            }
        },
        { label: 'Cancel', className: 'text-white', action: onClose },
    ];

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[#262626] w-[400px] rounded-xl overflow-hidden shadow-xl animate-zoom-in" onClick={e => e.stopPropagation()}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={option.action}
                        className={`w-full py-3.5 text-sm border-b border-[#363636] last:border-none hover:bg-white/5 transition-colors ${option.className}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>,
        document.body
    );
};

export default ProfileOptionsModal;
