import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CreditCard, ChevronRight, Info } from 'lucide-react';

const AdsPayments = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0">
            <h2 className="text-xl font-bold mb-10 mt-1">Ads payments</h2>

            <div className="flex flex-col gap-8 max-w-[600px]">
                {/* Method Section */}
                <div>
                    <h3 className="text-sm font-bold text-text-secondary uppercase mb-4 tracking-wide px-1">Payment Methods</h3>
                    <div className="border border-border rounded-xl bg-white dark:bg-black overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                    <CreditCard size={20} className="text-text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Add payment method</p>
                                    <p className="text-xs text-text-secondary">Add a credit or debit card, or other payment options.</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-text-secondary" />
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div>
                    <h3 className="text-sm font-bold text-text-secondary uppercase mb-4 tracking-wide px-1">Activity</h3>
                    <div className="border border-border rounded-xl bg-white dark:bg-black overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                    <Info size={20} className="text-text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Payment activity</p>
                                    <p className="text-xs text-text-secondary">View your payment history and invoices.</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-text-secondary" />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <div className="flex gap-4">
                        <Info size={20} className="text-blue-500 shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">About Payments</h4>
                            <p className="text-xs text-blue-500 leading-relaxed">
                                Payments on Jaadoe are managed securely. You can use your account to pay for ads and subscriptions across Jaadoe technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsPayments;
