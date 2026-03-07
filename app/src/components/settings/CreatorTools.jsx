import React, { useState, useEffect, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAccountType, switchAccountType } from '../../api/accountApi';
import { useLanguage } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';

const CreatorTools = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);
    const [accountType, setAccountType] = useState('personal');
    const [showModal, setShowModal] = useState(false);
    const [targetType, setTargetType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchType = async () => {
            try {
                const res = await getAccountType();
                setAccountType(res.accountType);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchType();
    }, []);

    const handleOpenModal = (type) => {
        setTargetType(type);
        setShowModal(true);
    };

    const handleSwitch = async () => {
        try {
            const res = await switchAccountType(targetType);
            setAccountType(res.accountType);
            if (updateUser) updateUser({ accountType: res.accountType });
            setShowModal(false);
            if (targetType === 'personal') {
                navigate('/settings/account-type');
            }
        } catch (err) {
            alert('Failed to switch account type');
        }
    };

    if (isLoading) return <div className="p-8 text-text-secondary">Loading...</div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0">
            <h2 className="text-xl font-bold mb-10 mt-1">
                {accountType === 'business' ? 'Business' : 'Creator'}
            </h2>

            <div className="border border-border rounded-xl bg-white dark:bg-black overflow-hidden max-w-[600px]">
                {accountType !== 'business' && (
                    <div
                        onClick={() => handleOpenModal('business')}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-border last:border-0"
                    >
                        <span className="text-sm font-medium">Switch to business account</span>
                        <ChevronRight size={18} className="text-text-secondary" />
                    </div>
                )}

                {accountType === 'business' && (
                    <div
                        onClick={() => handleOpenModal('creator')}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-border last:border-0"
                    >
                        <span className="text-sm font-medium">Switch to creator account</span>
                        <ChevronRight size={18} className="text-text-secondary" />
                    </div>
                )}

                {accountType !== 'personal' && (
                    <div
                        onClick={() => handleOpenModal('personal')}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="text-sm font-medium">Switch to personal account</span>
                        <ChevronRight size={18} className="text-text-secondary" />
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 overflow-y-auto">
                    <div className="bg-white dark:bg-[#262626] rounded-xl w-full max-w-[400px] overflow-hidden my-auto">
                        <div className="p-8 text-center">
                            <h3 className="text-xl font-semibold mb-3">
                                {targetType === 'personal' ? 'Switch to personal account?' :
                                    targetType === 'business' ? 'Switch to business account?' : 'Switch to creator account?'}
                            </h3>
                            <p className="text-sm text-text-secondary leading-5">
                                {targetType === 'personal'
                                    ? "When you switch to a personal account, you will lose access to insights from all your content, including your ads. You'll also lose access to Jaadoe business tools like Jaadoe Business Suite and Ads Manager. Your Jaadoe Verified subscription will also be canceled for this account."
                                    : targetType === 'business'
                                        ? "Switching to a business account allows you to access tools for brands and retailers. You'll still have access to your current creator tools."
                                        : "Switching to a creator account allows you to access tools for public figures, content producers, artists and influencers. You'll still have access to your current business tools."
                                }
                            </p>
                        </div>
                        <div className="flex flex-col border-t border-border">
                            <button
                                onClick={handleSwitch}
                                className={`w-full py-3.5 text-sm font-bold border-b border-border active:bg-gray-100 dark:active:bg-white/10 ${targetType === 'personal' ? 'text-[#ED4956]' : 'text-[#0095f6]'}`}
                            >
                                Switch to {targetType} account
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-3.5 text-sm text-text-primary active:bg-gray-100 dark:active:bg-white/10 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatorTools;
