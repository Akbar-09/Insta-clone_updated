import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateUserProfile, getUserById } from '../../api/userApi';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthContext); // Assuming setUser updates context if needed
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        website: '',
        bio: '',
        gender: 'Male',
        showAccountSuggestions: true,
        // showThreadsBadge: true // Not in backend yet
    });

    const [bioCount, setBioCount] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.id || user?.userId) {
                try {
                    const userId = user.id || user.userId;
                    const res = await getUserById(userId);
                    if (res.status === 'success') {
                        const data = res.data;
                        setFormData({
                            username: data.username || '',
                            fullName: data.fullName || '',
                            website: data.website || '',
                            bio: data.bio || '',
                            gender: data.gender || 'Male',
                            showAccountSuggestions: data.showAccountSuggestions !== undefined ? data.showAccountSuggestions : true,
                        });
                        setBioCount(data.bio ? data.bio.length : 0);
                    }
                } catch (err) {
                    console.error("Failed to fetch profile", err);
                    setMessage({ type: 'error', text: 'Failed to load profile data.' });
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'bio' && value.length > 150) return;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'bio') {
            setBioCount(value.length);
        }
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const userId = user.id || user.userId;
            const res = await updateUserProfile(userId, formData);
            if (res.status === 'success') {
                setMessage({ type: 'success', text: 'Profile saved.' });
                // Optionally update global user context if critical fields changed
                // setUser(res.data);
            }
        } catch (err) {
            console.error("Failed to update profile", err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-text-secondary">Loading profile...</div>;
    }

    return (
        <div className="flex flex-col w-full text-text-primary">
            <h2 className="text-xl font-bold mb-8 mt-1">Edit profile</h2>

            {message && (
                <div className={`mb-6 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {message.text}
                </div>
            )}

            {/* Profile Photo Section */}
            <div className="flex items-center bg-[#EFEFEF] dark:bg-[#262626] rounded-[20px] p-4 mb-8 justify-between">
                <div className="flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop"
                        alt="Profile"
                        className="w-[56px] h-[56px] rounded-full object-cover mr-4"
                    />
                    <div>
                        <div className="font-bold text-base leading-5">{formData.username}</div>
                        <div className="text-sm text-text-secondary leading-5">{formData.fullName}</div>
                    </div>
                </div>
                <div>
                    <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-[7px] rounded-[8px] text-sm font-semibold transition-colors">
                        Change photo
                    </button>
                </div>
            </div>

            {/* Form Fields */}
            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Name</h3>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-3 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-[#a8a8a8] bg-transparent"
                />
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Website</h3>
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full bg-[#EFEFEF] dark:bg-[#262626] border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-3 text-base text-text-secondary placeholder:text-text-secondary focus:outline-none cursor-not-allowed"
                    disabled
                />
                <p className="text-xs text-text-secondary mt-3 leading-4 max-w-[90%]">
                    Editing your links is only available on mobile. Visit the Jaadoe app and edit your profile to change the websites in your bio.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Bio</h3>
                <div className="relative">
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-2 text-base text-text-primary focus:outline-none focus:border-[#a8a8a8] min-h-[84px] resize-none bg-transparent block"
                    />
                    <div className="text-xs text-text-secondary mt-2 text-right">
                        {bioCount} / 150
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Gender</h3>
                <div className="relative">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-3 text-base text-text-primary focus:outline-none focus:border-[#a8a8a8] appearance-none cursor-pointer bg-transparent"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Custom">Custom</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                <p className="text-xs text-text-secondary mt-3">
                    This won't be part of your public profile.
                </p>
            </div>

            <div className="mb-10">
                <h3 className="font-bold text-base mb-2">Show account suggestions on profiles</h3>
                <div className="flex items-center justify-between border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] p-4">
                    <div className="mr-8">
                        <div className="text-sm font-semibold mb-1">Show account suggestions on profiles</div>
                        <div className="text-xs text-text-secondary leading-4">
                            Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.
                        </div>
                    </div>
                    {/* Custom Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            type="checkbox"
                            name="showAccountSuggestions"
                            checked={formData.showAccountSuggestions}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end mb-10">
                <button
                    onClick={handleSubmit}
                    className={`px-10 py-3 rounded-[8px] font-semibold text-white text-sm transition-all ${isSaving ? 'bg-[#0095f6]/70 cursor-wait' : 'bg-[#0095f6] hover:bg-[#1877f2] active:opacity-70'}`}
                    disabled={isSaving}
                >
                    {isSaving ? 'Sending...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
