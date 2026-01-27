import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom';
import { updateMyProfile } from '../api/profileApi';

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        website: '',
        gender: '',
        profilePicture: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.fullName || '',
                bio: profile.bio || '',
                website: profile.website || '',
                gender: profile.gender || '',
                profilePicture: profile.profilePicture || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await updateMyProfile(formData);

            if (response.status === 'success') {
                // Update parent component with new data
                if (onUpdate) {
                    onUpdate(response.data);
                }

                // Show success message
                const toast = document.createElement('div');
                toast.textContent = 'Profile updated successfully';
                toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);

                onClose();
            }
        } catch (err) {
            console.error('Update profile error:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#262626] w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl animate-zoom-in">
                {/* Header */}
                <div className="border-b border-[#363636] px-4 py-3 flex items-center justify-between">
                    <h2 className="text-white font-semibold text-lg">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-70 transition-opacity"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Profile Picture */}
                    <div className="mb-6 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                            {formData.profilePicture ? (
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-2xl font-bold">
                                    {profile?.username?.[0]?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-white text-sm font-medium mb-1">
                                Profile Picture URL
                            </label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={formData.profilePicture}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-1">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            rows="3"
                            maxLength="150"
                            className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors resize-none"
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            {formData.bio.length}/150
                        </div>
                    </div>

                    {/* Website */}
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-1">
                            Website
                        </label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-medium mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors"
                        >
                            <option value="">Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-[#363636] text-white rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-[#0095F6] text-white rounded-lg hover:bg-[#1877F2] transition-colors disabled:opacity-50 font-semibold"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default EditProfileModal;
