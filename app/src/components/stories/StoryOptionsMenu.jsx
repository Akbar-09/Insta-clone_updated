import { useRef, useEffect } from 'react';

const StoryOptionsMenu = ({ isOpen, onClose, isOwner, onDelete, onReport, onAbout }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-none" onClick={onClose}>
            <div
                ref={menuRef}
                className="w-[300px] md:w-[400px] bg-[#262626] rounded-xl overflow-hidden animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-col">
                    {isOwner ? (
                        <>
                            <button
                                onClick={onDelete}
                                className="w-full py-3.5 text-center text-red-500 font-bold border-b border-[#363636] active:bg-[#363636] transition-colors text-sm"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => { onAbout(); onClose(); }}
                                className="w-full py-3.5 text-center text-white border-b border-[#363636] active:bg-[#363636] transition-colors text-sm"
                            >
                                About this account
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onReport}
                                className="w-full py-3.5 text-center text-red-500 font-bold border-b border-[#363636] active:bg-[#363636] transition-colors text-sm"
                            >
                                Report
                            </button>
                            <button
                                onClick={() => { onAbout(); onClose(); }}
                                className="w-full py-3.5 text-center text-white border-b border-[#363636] active:bg-[#363636] transition-colors text-sm"
                            >
                                About this account
                            </button>
                        </>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full py-3.5 text-center text-white active:bg-[#363636] transition-colors text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryOptionsMenu;
