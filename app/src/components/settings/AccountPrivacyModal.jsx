import React from 'react';
import { X } from 'lucide-react';

const AccountPrivacyModal = ({ onClose, onConfirm, isSwitchingToPrivate }) => {
    if (!isSwitchingToPrivate) return null; // Only show when switching TO private

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#262626] rounded-xl w-full max-w-[400px] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-col items-center p-8 text-center">
                    <h3 className="text-xl font-medium mb-4 text-text-primary">
                        Switch to Private Account?
                    </h3>

                    <ul className="text-sm text-text-secondary space-y-4 mb-6 text-left w-full list-disc pl-4">
                        <li>Only your followers will be able to see your photos and videos.</li>
                        <li>This won't change who can tag, @mention or message you.</li>
                    </ul>
                </div>

                <div className="flex flex-col border-t border-[#dbdbdb] dark:border-[#363636]">
                    <button
                        onClick={onConfirm}
                        className="py-3.5 w-full text-center text-sm font-bold text-[#0095f6] border-b border-[#dbdbdb] dark:border-[#363636] active:bg-[#dbdbdb]/20 dark:active:bg-[#363636]"
                    >
                        Switch to Private
                    </button>
                    <button
                        onClick={onClose}
                        className="py-3.5 w-full text-center text-sm text-text-primary active:bg-[#dbdbdb]/20 dark:active:bg-[#363636]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountPrivacyModal;
