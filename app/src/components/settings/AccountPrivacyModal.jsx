import React from 'react';
import { Camera, AtSign, RefreshCcw } from 'lucide-react';

const AccountPrivacyModal = ({ onClose, onConfirm, isSwitchingToPrivate }) => {
    if (!isSwitchingToPrivate) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#262626] rounded-[12px] w-full max-w-[400px] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-col items-center p-6 text-center">
                    <h3 className="text-xl font-medium mb-6 text-text-primary">
                        Switch to private account?
                    </h3>

                    <div className="space-y-6 text-left w-full px-2">
                        <div className="flex items-start gap-4">
                            <Camera className="w-6 h-6 shrink-0 mt-0.5" />
                            <p className="text-sm text-text-primary leading-tight">
                                Only your followers will be able to see your photos and videos.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <AtSign className="w-6 h-6 shrink-0 mt-0.5" />
                            <p className="text-sm text-text-primary leading-tight">
                                This won't change who can message, tag or @mention you, but you won't be able to tag people who don't follow you.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <RefreshCcw className="w-6 h-6 shrink-0 mt-0.5" />
                            <p className="text-sm text-text-primary leading-tight">
                                No one can reuse your content. All reels, posts and stories that previously used your content in features, such as remixes, sequences, templates or stickers will be deleted. If you switch back to a public account within 24 hours, they will be restored.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col border-t border-[#dbdbdb] dark:border-[#363636] mt-4">
                    <button
                        onClick={onConfirm}
                        className="py-3 w-full text-center text-sm font-bold text-[#0095f6] border-b border-[#dbdbdb] dark:border-[#363636] active:bg-[#dbdbdb]/20 dark:active:bg-[#363636] transition-colors"
                    >
                        Switch to private
                    </button>
                    <button
                        onClick={onClose}
                        className="py-3 w-full text-center text-sm text-text-primary active:bg-[#dbdbdb]/20 dark:active:bg-[#363636] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountPrivacyModal;
