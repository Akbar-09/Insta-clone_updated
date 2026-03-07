import React, { useState, useEffect, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAccountType } from '../../api/accountApi';
import { useLanguage } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';

const AccountTypeSelection = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentType, setCurrentType] = useState('personal');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountType = async () => {
            try {
                const res = await getAccountType();
                setCurrentType(res.accountType || 'personal');
            } catch (err) {
                console.error('Failed to get account type', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAccountType();
    }, []);

    if (loading) {
        return <div className="p-8 flex justify-center text-text-secondary">Loading...</div>;
    }

    return (
        <div className="max-w-[700px] mx-auto w-full text-text-primary px-4 pt-1">
            <h2 className="text-xl font-bold mb-8">Account type and tools</h2>

            <div className="flex flex-col">
                <h3 className="text-sm font-bold mb-4">Account type</h3>

                <div
                    onClick={() => navigate('/settings/professional-onboarding')}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-border rounded-xl bg-white dark:bg-black"
                >
                    <span className="text-sm font-medium">Switch to Professional Account</span>
                    <ChevronRight size={18} className="text-text-secondary" />
                </div>
            </div>
        </div>
    );
};

export default AccountTypeSelection;
