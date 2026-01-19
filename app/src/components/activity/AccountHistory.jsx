import { useState } from 'react';
import {
    ChevronDown, ChevronRight, User, AtSign, PenSquare, Mail,
    Eye, Key, Info, MessageCircle
} from 'lucide-react';

const MOCK_HISTORY = [
    {
        section: "This year",
        items: [
            { id: 1, type: 'name', title: 'Name', desc: 'You changed your name to Akbar Khan', time: '30w', icon: User },
            { id: 2, type: 'bio', title: 'Bio', desc: 'You removed your bio from your profile', time: '45w', icon: PenSquare },
        ]
    },
    {
        section: "Earlier",
        items: [
            { id: 3, type: 'bio', title: 'Bio', desc: 'You changed your bio', time: '1y', icon: PenSquare },
            { id: 4, type: 'messaging', title: 'Messaging', desc: 'You started using Messenger on Jaadoe', time: '3y', icon: MessageCircle },
            { id: 5, type: 'privacy', title: 'Account privacy', desc: 'You made your account private', time: '5y', icon: Eye },
            { id: 6, type: 'password', title: 'Password', desc: 'You changed your password', time: '5y', icon: Key },
            { id: 7, type: 'email', title: 'Email', desc: 'You updated your email address', time: '6y', icon: Mail },
            { id: 8, type: 'username', title: 'Username', desc: 'You changed your username', time: '7y', icon: AtSign },
            { id: 9, type: 'created', title: 'Account created', desc: 'You created your account', time: 'Oct 14, 2015', icon: Info },
        ]
    }
];

const AccountHistory = () => {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-transparent text-text-primary">
                <h2 className="text-xl font-bold mb-2">About account history</h2>
                <p className="text-sm text-text-secondary text-center max-w-[400px]">
                    Review changes that you've made to your account since you created it.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between px-6 mb-2">
                <div className="flex items-center">
                    <div className="flex items-center text-sm font-semibold text-text-primary cursor-pointer select-none">
                        Newest to oldest
                        <ChevronDown size={16} className="ml-1" />
                    </div>
                    <button className="ml-4 font-semibold text-sm text-blue-btn cursor-pointer">Sort & Filter</button>
                </div>
                <button className="text-sm font-semibold text-blue-btn cursor-pointer px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                    Select
                </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col pb-10">
                    {MOCK_HISTORY.map((section, idx) => (
                        <div key={idx}>
                            <div className="px-6 py-3">
                                <span className="font-bold text-base text-text-primary">{section.section}</span>
                            </div>
                            <div>
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors group">
                                            <div className="flex items-center overflow-hidden">
                                                {/* Icon Box */}
                                                <div className="mr-4 flex-shrink-0">
                                                    {Icon && <Icon size={24} className="text-text-primary" />}
                                                </div>
                                                {/* Text */}
                                                <div className="flex flex-col min-w-0 pr-4">
                                                    <span className="text-base font-bold text-text-primary leading-5 mb-0.5">{item.title}</span>
                                                    <span className="text-sm text-text-secondary truncate">
                                                        {item.desc}
                                                        <span className="text-text-secondary mx-1">·</span>
                                                        {item.time}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-text-secondary flex-shrink-0" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccountHistory;
