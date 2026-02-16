import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateUserProfile, getUserById, uploadMedia, updateProfilePhoto, removeProfilePhoto } from '../../api/userApi';
import { X, Loader2 } from 'lucide-react';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthContext); // Assuming setUser updates context if needed
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        website: '',
        bio: '',
        gender: 'Male',
        showAccountSuggestions: true,
        profilePicture: ''
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
                            profilePicture: (data.profilePicture && data.profilePicture.startsWith('blob:')) ? '' : (data.profilePicture || '')
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

    const handlePhotoClick = () => {
        setShowPhotoModal(true);
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsUploading(true);
            setShowPhotoModal(false); // Close modal during upload/optimistic
            try {
                // 1. Upload to Media Service
                const mediaRes = await uploadMedia(file);
                const photoUrl = mediaRes.data.url;

                // 2. Update Profile with new URL
                await updateProfilePhoto(photoUrl);

                // 3. Update State
                setFormData(prev => ({ ...prev, profilePicture: photoUrl }));
                // Update context if needed
                if (setUser) setUser(prev => ({ ...prev, profilePicture: photoUrl }));

                setMessage({ type: 'success', text: 'Profile photo updated.' });
            } catch (error) {
                console.error('Photo upload failed', error);
                setMessage({ type: 'error', text: 'Failed to upload photo.' });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleRemovePhoto = async () => {
        if (!formData.profilePicture) return;
        setIsUploading(true);
        setShowPhotoModal(false);
        try {
            await removeProfilePhoto();
            setFormData(prev => ({ ...prev, profilePicture: '' }));
            if (setUser) setUser(prev => ({ ...prev, profilePicture: '' }));
            setMessage({ type: 'success', text: 'Profile photo removed.' });
        } catch (error) {
            console.error('Remove photo failed', error);
            setMessage({ type: 'error', text: 'Failed to remove photo.' });
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-text-secondary">Loading profile...</div>;
    }

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0">
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
                        src={formData.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                        alt="Profile"
                        className="w-[56px] h-[56px] rounded-full object-cover mr-4"
                    />
                    <div>
                        <div className="font-bold text-base leading-5">{formData.username || user?.username}</div>
                        <div className="text-sm text-text-secondary leading-5">{formData.fullName || user?.fullName}</div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={handlePhotoClick}
                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-[7px] rounded-[8px] text-sm font-semibold transition-colors"
                    >
                        Change photo
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        hidden
                        accept="image/jpeg,image/png,image/webp"
                    />
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
                <h3 className="font-bold text-base mb-2">Username</h3>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-3 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-[#a8a8a8] bg-transparent"
                />
            </div>

            {/* Website */}
            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Website</h3>
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full bg-[#EFEFEF] dark:bg-[#262626] border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-3 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-[#a8a8a8]"
                />
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-base mb-2">Bio</h3>
                {/* Bio */}
                <div className="mb-4">
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        className="w-full border border-[#dbdbdb] dark:border-[#363636] rounded-[12px] px-4 py-2 text-base text-text-primary focus:outline-none focus:border-[#a8a8a8] min-h-[84px] resize-none bg-transparent block"
                    />
                    <div className="text-xs text-text-secondary mt-2 text-right">
                        {bioCount} / 150
                    </div>
                </div>
            </div>

            {/* Photo Modal */}
            {showPhotoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65" onClick={() => setShowPhotoModal(false)}>
                    <div className="bg-[#262626] rounded-xl w-[400px] overflow-hidden flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <div className="w-full py-6 border-b border-[#363636] text-center">
                            <h3 className="text-xl font-normal text-white">Change Profile Photo</h3>
                        </div>
                        <button
                            className="w-full py-3 border-b border-[#363636] text-sm font-bold text-[#0095f6] active:bg-[#1a1a1a]"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Upload Photo
                        </button>
                        <button
                            className="w-full py-3 border-b border-[#363636] text-sm font-bold text-[#ed4956] active:bg-[#1a1a1a]"
                            onClick={handleRemovePhoto}
                        >
                            Remove Current Photo
                        </button>
                        <button
                            className="w-full py-3 text-sm text-white active:bg-[#1a1a1a]"
                            onClick={() => setShowPhotoModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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
                        <div className="toggle-pill"></div>
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
