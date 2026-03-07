import React, { useState, useEffect, useContext } from 'react';
import { User, Monitor, ChevronRight, CheckCircle, Search, ArrowLeft, BarChart3, MessageSquare, PlusCircle, HelpCircle, Phone, Info, Mail, UserPlus } from 'lucide-react';
import { getProxiedUrl } from '../../utils/urlUtils';
import { useNavigate } from 'react-router-dom';
import { getAccountType, switchAccountType, getAccountCategories, saveAccountCategory, getAccountProfile, updateAccountProfile } from '../../api/accountApi';
import { useLanguage } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';

const ProfessionalAccount = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { user, updateUser } = useContext(AuthContext);

    // Flow State
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Form State (Settings)
    const [profileData, setProfileData] = useState({
        category: '',
        display_category: true,
        business_email: '',
        whatsapp_number: '',
        business_phone: '',
        reach_preference: 'call',
        display_contact: true
    });

    // Onboarding State
    const [selectedType, setSelectedType] = useState('creator');
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                // Check if user is already professional
                const typeRes = await getAccountType();
                if (typeRes.accountType !== 'personal') {
                    setStep('settings');
                    const profileRes = await getAccountProfile();
                    if (profileRes.status === 'success') {
                        setProfileData({
                            category: profileRes.data.category || '',
                            display_category: profileRes.data.display_category ?? true,
                            business_email: profileRes.data.business_email || '',
                            whatsapp_number: profileRes.data.whatsapp_number || '',
                            business_phone: profileRes.data.business_phone || '',
                            reach_preference: profileRes.data.reach_preference || 'call',
                            display_contact: profileRes.data.display_contact ?? true
                        });
                    }
                } else {
                    setStep(1);
                }
            } catch (err) {
                console.error('Initialization error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (step === 3) {
            fetchCategories();
        }
    }, [step, selectedType]);

    const fetchCategories = async () => {
        try {
            const res = await getAccountCategories(selectedType);
            setCategories(res.data || []);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    };

    const handleOnboardingDone = async () => {
        setIsSaving(true);
        try {
            await switchAccountType(selectedType);
            if (selectedCategory) {
                await saveAccountCategory(selectedCategory.id, true);
            }
            if (updateUser) updateUser({ accountType: selectedType });
            setStep(5);
        } catch (err) {
            alert('Failed to complete onboarding');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateAccountProfile(profileData);
            alert('Settings updated successfully');
        } catch (err) {
            alert('Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="p-8 text-center text-text-secondary">Loading...</div>;

    // --- RENDER FUNCTIONS ---

    const renderOnboardingStep1 = () => (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[800px] mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#121212] border border-border rounded-xl shadow-sm w-full max-w-[660px] p-8 flex flex-col">
                <h2 className="text-[28px] font-bold mb-10 text-center text-text-primary tracking-tight">Which best describes you?</h2>

                <div className="flex flex-col gap-5 mb-12">
                    {/* Creator Card */}
                    <div
                        onClick={() => setSelectedType('creator')}
                        className={`group relative p-6 border rounded-2xl cursor-pointer transition-all flex items-center gap-6 ${selectedType === 'creator' ? 'border-text-primary shadow-[0_0_0_1px_rgba(0,0,0,0.1)]' : 'border-border hover:border-text-secondary'}`}
                    >
                        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center bg-gray-50 dark:bg-white/5 transition-colors group-hover:bg-gray-100">
                            <UserPlus size={32} className="text-text-primary" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-[19px] mb-1">Creator</h4>
                            <p className="text-[14px] text-text-secondary leading-tight opacity-90">Best for public figures, content producers, artists and influencers.</p>
                        </div>
                        <div className={`w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center transition-all ${selectedType === 'creator' ? 'border-primary bg-primary' : 'border-border'}`}>
                            {selectedType === 'creator' && <div className="w-[10px] h-[10px] rounded-full bg-white dark:bg-black" />}
                        </div>
                    </div>

                    {/* Business Card */}
                    <div
                        onClick={() => setSelectedType('business')}
                        className={`group relative p-6 border rounded-2xl cursor-pointer transition-all flex items-center gap-6 ${selectedType === 'business' ? 'border-text-primary shadow-[0_0_0_1px_rgba(0,0,0,0.1)]' : 'border-border hover:border-text-secondary'}`}
                    >
                        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center bg-gray-50 dark:bg-white/5 transition-colors group-hover:bg-gray-100">
                            <Monitor size={32} className="text-text-primary" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-[19px] mb-1">Business</h4>
                            <p className="text-[14px] text-text-secondary leading-tight opacity-90">Best for retailers, local businesses, brands, organisations and service providers.</p>
                        </div>
                        <div className={`w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center transition-all ${selectedType === 'business' ? 'border-primary bg-primary' : 'border-border'}`}>
                            {selectedType === 'business' && <div className="w-[10px] h-[10px] rounded-full bg-white dark:bg-black" />}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border mt-4">
                    <button
                        onClick={() => setStep(2)}
                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold py-[7px] px-8 rounded-[8px] transition-all text-[14px] shadow-sm active:scale-95"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

    const renderOnboardingStep2 = () => (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[800px] mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#121212] border border-border rounded-xl shadow-sm w-full max-w-[660px] p-8 px-10 flex flex-col">
                <div className="flex flex-col items-center mb-10 pt-4">
                    <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center bg-gray-50 dark:bg-white/5 mb-6 shadow-sm">
                        <UserPlus size={40} className="text-text-primary opacity-90" />
                    </div>
                    <h2 className="text-[30px] font-bold mb-2 text-text-primary tracking-tight">{selectedType === 'creator' ? 'Creator' : 'Business'}</h2>
                    <p className="text-[14px] text-text-secondary text-center max-w-[420px] opacity-90">
                        {selectedType === 'creator'
                            ? 'Best for public figures, content producers, artists and influencers.'
                            : 'Best for retailers, local businesses, brands, organisations and service providers.'
                        }
                    </p>
                </div>

                <div className="space-y-10 mb-14 pt-4 max-w-[480px] mx-auto w-full">
                    <div className="flex gap-5 items-start">
                        <div className="p-1"><User size={24} className="text-text-primary opacity-80" strokeWidth={1.5} /></div>
                        <div>
                            <h4 className="font-bold text-[17px] mb-1">Flexible profile controls</h4>
                            <p className="text-[14px] text-text-secondary leading-snug">You can choose to hide or display contact info and buttons on your profile.</p>
                        </div>
                    </div>
                    <div className="flex gap-5 items-start">
                        <div className="p-1"><MessageSquare size={24} className="text-text-primary opacity-80" strokeWidth={1.5} /></div>
                        <div>
                            <h4 className="font-bold text-[17px] mb-1">Simplified messaging</h4>
                            <p className="text-[14px] text-text-secondary leading-snug">A new inbox makes it easier to manage message requests and connect with fans.</p>
                        </div>
                    </div>
                    <div className="flex gap-5 items-start">
                        <div className="p-1"><BarChart3 size={24} className="text-text-primary opacity-80" strokeWidth={1.5} /></div>
                        <div>
                            <h4 className="font-bold text-[17px] mb-1">More growth tools</h4>
                            <p className="text-[14px] text-text-secondary leading-snug">Get more advanced insights and reach more people with promotions.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 pt-4 border-t border-border">
                    <button
                        onClick={() => setStep(1)}
                        className="bg-[#EFEFEF] dark:bg-white/10 hover:opacity-80 text-text-primary font-bold py-[7px] px-6 rounded-[8px] transition-all text-[14px]"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold py-[7px] px-8 rounded-[8px] transition-all text-[14px] shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

    const renderCategorySelection = (isFromSettings = false) => (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[800px] mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#121212] border border-border rounded-xl shadow-sm w-full max-w-[660px] h-[720px] flex flex-col p-8 px-10">
                <div className="text-center mb-8">
                    <h2 className="text-[28px] font-bold tracking-tight">Select a category</h2>
                    <p className="text-[14px] text-text-secondary mt-2">Choose a category that best describes what you do. You'll have the option to display or hide this on your profile.</p>
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors mb-6">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={profileData.display_category}
                                onChange={(e) => setProfileData({ ...profileData, display_category: e.target.checked })}
                                className="peer w-[20px] h-[20px] appearance-none border border-border rounded-md transition-all checked:bg-[#0095f6] checked:border-[#0095f6] bg-transparent"
                            />
                            <CheckCircle className="absolute top-0 left-0 w-[20px] h-[20px] text-white scale-0 peer-checked:scale-75 transition-all" />
                        </div>
                        <span className="text-[14px] font-medium">Show category on profile</span>
                    </label>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-text-primary" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-black/5 dark:bg-white/5 focus:outline-none focus:border-[#a8a8a8] text-[15px]"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto mb-8 pr-2 custom-scrollbar">
                    <h4 className="text-[15px] font-bold mb-4 px-1">Suggested</h4>
                    <div className="space-y-1">
                        {filteredCategories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    if (isFromSettings) {
                                        setProfileData({ ...profileData, category: cat.name });
                                        setStep('settings');
                                    }
                                }}
                                className="flex items-center justify-between p-4 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer rounded-xl transition-colors group"
                            >
                                <span className={`text-[15px] ${selectedCategory?.id === cat.id ? 'font-bold' : 'font-normal'}`}>{cat.name}</span>
                                <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${selectedCategory?.id === cat.id ? 'border-[#0095f6] bg-[#0095f6]' : 'border-border'}`}>
                                    {selectedCategory?.id === cat.id && <div className="w-[8px] h-[8px] rounded-full bg-white dark:bg-black" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between gap-4 pt-6 border-t border-border">
                    <button
                        onClick={() => setStep(isFromSettings ? 'settings' : 2)}
                        className="bg-[#EFEFEF] dark:bg-white/10 hover:opacity-80 text-text-primary font-bold py-[7px] px-6 rounded-[8px] transition-all text-[14px]"
                    >
                        Back
                    </button>
                    {!isFromSettings && (
                        <button
                            onClick={handleOnboardingDone}
                            disabled={!selectedCategory || isSaving}
                            className={`px-8 py-[7px] rounded-[8px] font-bold text-[14px] transition-all shadow-sm ${selectedCategory ? 'bg-[#0095f6] hover:bg-[#1877f2] text-white' : 'bg-[#0095f6]/50 text-white cursor-not-allowed'}`}
                        >
                            {isSaving ? 'Saving...' : 'Done'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[800px] mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#121212] border border-border rounded-xl shadow-sm w-full max-w-[660px] p-12 flex flex-col items-center">
                <div className="relative mb-10">
                    <img
                        src={user?.avatar ? getProxiedUrl(user.avatar) : `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-border p-1 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black p-1 rounded-full shadow-md border border-border">
                        <UserPlus size={18} className="text-text-primary" />
                    </div>
                </div>

                <h2 className="text-[28px] font-bold mb-4 text-center tracking-tight">Your Jaadoe {selectedType} account is ready</h2>
                <p className="text-[14px] text-text-secondary text-center mb-10 opacity-90">You now have more tools to connect with your audience on Jaadoe.</p>

                <div className="w-full space-y-8 mb-12 max-w-[480px]">
                    <div className="flex gap-5 items-start">
                        <div className="p-1"><Phone size={22} className="text-text-primary opacity-80" strokeWidth={1.5} /></div>
                        <p className="text-[14px] text-text-secondary leading-snug">Go to the mobile app to learn more about your followers with insights, display and edit contact buttons, reach customers with promotions and more.</p>
                    </div>
                    <div className="flex gap-5 items-start">
                        <div className="p-1"><Monitor size={22} className="text-text-primary opacity-80" strokeWidth={1.5} /></div>
                        <p className="text-[14px] text-text-secondary leading-snug">Manage your new {selectedType} account on desktop with <span className="text-[#0095f6] font-semibold cursor-pointer">Business Suite</span>.</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/feed')}
                    className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold py-2.5 rounded-[8px] transition-all text-sm shadow-md active:scale-95"
                >
                    Done
                </button>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="flex flex-col w-full max-w-[750px] mx-auto py-4 px-4 text-text-primary">
            <div className="flex items-center gap-4 mb-12">
                <button onClick={() => navigate(-1)} className="hover:opacity-70 transition-opacity">
                    <ArrowLeft size={28} strokeWidth={1.5} />
                </button>
                <h2 className="text-xl font-bold">Professional Account</h2>
            </div>

            <form onSubmit={handleSettingsSubmit} className="space-y-12">
                {/* Category Section */}
                <div className="flex items-start">
                    <div className="w-48 shrink-0 pt-1">
                        <label className="text-sm font-semibold">Category</label>
                    </div>
                    <div className="flex-1 max-w-[420px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-text-primary">{profileData.category || 'Select category'}</span>
                            <button type="button" onClick={() => setStep('change-category')} className="text-sm font-bold text-[#0095f6] hover:text-blue-700">Change</button>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={profileData.display_category}
                                    onChange={(e) => setProfileData({ ...profileData, display_category: e.target.checked })}
                                    className="peer w-5 h-5 appearance-none border-2 border-[#dbdbdb] dark:border-[#363636] rounded transition-all checked:bg-[#0095f6] checked:border-[#0095f6] bg-transparent"
                                />
                                <CheckCircle className="absolute top-0 left-0 w-5 h-5 text-white scale-0 peer-checked:scale-75 transition-transform" />
                            </div>
                            <span className="text-sm text-text-primary font-medium">Display category label</span>
                        </label>
                    </div>
                </div>

                {/* Public Business Info Section */}
                <div className="space-y-10">
                    <div className="flex items-start border-t border-border pt-10">
                        <div className="w-48" />
                        <h3 className="text-base font-bold">Public business information</h3>
                    </div>

                    {/* Email */}
                    <div className="flex items-center">
                        <div className="w-48 shrink-0">
                            <label className="text-sm font-semibold">Email address</label>
                        </div>
                        <input
                            type="email"
                            placeholder="Business email address"
                            value={profileData.business_email}
                            onChange={(e) => setProfileData({ ...profileData, business_email: e.target.value })}
                            className="flex-1 max-w-[420px] bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#363636] rounded-lg p-3 text-sm focus:outline-none focus:border-text-secondary transition-colors"
                        />
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start">
                        <div className="w-48 shrink-0 pt-3">
                            <label className="text-sm font-semibold">WhatsApp number</label>
                        </div>
                        <div className="flex-1 max-w-[420px]">
                            <div className="flex gap-2 mb-4">
                                <div className="w-12 h-11 border border-[#dbdbdb] dark:border-[#363636] rounded-lg flex items-center justify-center bg-gray-50 dark:bg-white/5">
                                    <PlusCircle size={20} className="text-text-secondary" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="WhatsApp Business number"
                                    value={profileData.whatsapp_number}
                                    onChange={(e) => setProfileData({ ...profileData, whatsapp_number: e.target.value })}
                                    className="flex-1 bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#363636] rounded-lg p-3 text-sm focus:outline-none"
                                />
                            </div>
                            <button type="button" className="bg-[#EFEFEF] dark:bg-white/10 px-5 py-2 rounded-lg text-sm font-bold text-text-primary hover:opacity-80 transition-opacity mb-8">Continue</button>

                            <p className="text-[13px] text-text-secondary leading-normal mb-8">
                                Connect your WhatsApp Business account to Jaadoe to create ads that open WhatsApp chats. Your number will be shown to anyone who sends you a message through your ad.
                            </p>

                            <div className="space-y-8 mb-4">
                                <div className="flex gap-4">
                                    <Monitor size={22} className="text-text-primary shrink-0 opacity-80" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold mb-1 leading-tight">WhatsApp with business features</h4>
                                        <p className="text-[12px] text-text-secondary leading-snug">Keep your number, chats and contacts while adding business features to your WhatsApp.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <MessageSquare size={22} className="text-text-primary shrink-0 opacity-80" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold mb-1 leading-tight">Drive sales from conversations</h4>
                                        <p className="text-[12px] text-text-secondary leading-snug">Manage messages to build lasting customer relationships with the tools in WhatsApp Business.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-start pt-6 border-t border-border/50">
                        <div className="w-48 shrink-0 pt-3">
                            <label className="text-sm font-semibold">Phone number</label>
                        </div>
                        <div className="flex-1 max-w-[420px]">
                            <div className="flex gap-2 mb-3">
                                <div className="px-5 h-11 border border-[#dbdbdb] dark:border-[#363636] rounded-lg flex items-center justify-center bg-gray-50 dark:bg-white/5 text-sm font-semibold text-text-secondary">
                                    IN +
                                </div>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    value={profileData.business_phone}
                                    onChange={(e) => setProfileData({ ...profileData, business_phone: e.target.value })}
                                    className="flex-1 bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#363636] rounded-lg p-3 text-sm focus:outline-none"
                                />
                            </div>
                            <p className="text-[12px] text-text-secondary">You may receive SMS updates from Jaadoe and can opt out at any time.</p>
                        </div>
                    </div>
                </div>

                {/* Reach Preference Section */}
                <div className="space-y-8 border-t border-border pt-10">
                    <div className="flex items-start">
                        <div className="w-48 shrink-0 pt-1">
                            <label className="text-sm font-semibold leading-tight">How would you like to be reached?</label>
                        </div>
                        <div className="flex-1 max-w-[420px]">
                            <div className="flex flex-col gap-6 mb-8">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${profileData.reach_preference === 'call' ? 'border-[#0095f6]' : 'border-[#dbdbdb] dark:border-[#363636]'}`}>
                                        {profileData.reach_preference === 'call' && <div className="w-2.5 h-2.5 rounded-full bg-[#0095f6]" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="reach"
                                        hidden
                                        checked={profileData.reach_preference === 'call'}
                                        onChange={() => setProfileData({ ...profileData, reach_preference: 'call' })}
                                    />
                                    <span className="text-sm font-medium">Call</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${profileData.reach_preference === 'text' ? 'border-[#0095f6]' : 'border-[#dbdbdb] dark:border-[#363636]'}`}>
                                        {profileData.reach_preference === 'text' && <div className="w-2.5 h-2.5 rounded-full bg-[#0095f6]" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="reach"
                                        hidden
                                        checked={profileData.reach_preference === 'text'}
                                        onChange={() => setProfileData({ ...profileData, reach_preference: 'text' })}
                                    />
                                    <span className="text-sm font-medium">Text</span>
                                </label>
                            </div>

                            <p className="text-[12px] text-text-secondary leading-normal mb-8">
                                People will be able to call or text you on this number. Standard messaging rates apply.
                            </p>

                            <label className="flex items-center gap-3 cursor-pointer mb-2">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={profileData.display_contact}
                                        onChange={(e) => setProfileData({ ...profileData, display_contact: e.target.checked })}
                                        className="peer w-5 h-5 appearance-none border-2 border-[#dbdbdb] dark:border-[#363636] rounded transition-all checked:bg-[#0095f6] checked:border-[#0095f6] bg-transparent"
                                    />
                                    <CheckCircle className="absolute top-0 left-0 w-5 h-5 text-white scale-0 peer-checked:scale-75 transition-transform" />
                                </div>
                                <span className="text-sm font-bold">Display contact info</span>
                            </label>
                            <p className="text-[12px] text-text-secondary leading-normal">
                                Contact buttons are only visible on your profile in the Jaadoe mobile app.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex items-start pt-4">
                    <div className="w-48" />
                    <div className="flex-1 max-w-[420px] pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold py-2 px-10 rounded-lg text-sm transition-all shadow-sm"
                        >
                            {isSaving ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

    switch (step) {
        case 1: return renderOnboardingStep1();
        case 2: return renderOnboardingStep2();
        case 3: return renderCategorySelection(false);
        case 5: return renderSuccess();
        case 'settings': return renderSettings();
        case 'change-category': return renderCategorySelection(true);
        default: return renderOnboardingStep1();
    }
};

export default ProfessionalAccount;
