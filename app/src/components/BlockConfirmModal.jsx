import ReactDOM from 'react-dom';

const BlockConfirmModal = ({ isOpen, onClose, onConfirm, username }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/65 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-[#262626] w-[400px] max-w-[80%] rounded-xl overflow-hidden shadow-xl animate-zoom-in flex flex-col items-center text-center pb-0 pt-8" onClick={e => e.stopPropagation()}>
                <div className="px-8 pb-6">
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Block {username}?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-5">
                        They won't be able to find your profile, posts or story on Instagram. Instagram won't let them know you blocked them.
                    </p>
                </div>
                <div className="w-full flex flex-col border-t border-gray-200 dark:border-[#363636]">
                    <button
                        onClick={onConfirm}
                        className="w-full py-3.5 text-sm font-bold text-red-500 border-b border-gray-200 dark:border-[#363636] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Block
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BlockConfirmModal;
