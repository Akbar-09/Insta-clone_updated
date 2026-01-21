import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import { uploadProfilePhoto, removeProfilePhoto } from '../api/profileApi';

const ChangeProfilePhotoModal = ({ onClose, onSuccess }) => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setLoading(true);
        try {
            // SIMULATION: In a real app, we would upload the file to Cloudinary/S3 here.
            // Since we don't have cloud credentials, we're using a placeholder to simulate the "new" photo.
            // The file picker UX is preserved.
            const fakeNewPhotoUrl = `https://i.pravatar.cc/300?u=${Date.now()}`;

            const response = await uploadProfilePhoto({ profilePicture: fakeNewPhotoUrl });

            if (response.status === 'success') {
                if (onSuccess) onSuccess(response.data.profilePicture);
                onClose();
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload photo');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCurrent = async () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        setLoading(true);
        try {
            await removeProfilePhoto();
            if (onSuccess) onSuccess(null); // Return null to indicate removal
            onClose();
        } catch (error) {
            console.error('Remove photo error:', error);
            alert('Failed to remove photo');
        } finally {
            setLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[#262626] w-[400px] rounded-xl overflow-hidden shadow-xl animate-zoom-in" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="py-6 border-b border-[#363636] text-center">
                    <h2 className="text-white font-semibold text-lg">Change Profile Photo</h2>
                </div>

                {/* Options */}
                <div className="flex flex-col">
                    <button
                        onClick={handleUploadClick}
                        disabled={loading}
                        className="w-full py-3.5 text-sm font-bold text-[#0095F6] border-b border-[#363636] hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Uploading...' : 'Upload Photo'}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <button
                        onClick={handleRemoveCurrent}
                        disabled={loading}
                        className="w-full py-3.5 text-sm font-bold text-red-500 border-b border-[#363636] hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Remove Current Photo
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-3.5 text-sm text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ChangeProfilePhotoModal;
