import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import { removeProfilePhoto, uploadAvatarDirect } from '../api/profileApi';
import AvatarEditor from 'react-avatar-editor';

const ChangeProfilePhotoModal = ({ onClose, onSuccess }) => {
    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1.2);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setImage(file);
    };

    const handleSaveCroppedImage = async () => {
        if (!editorRef.current) return;
        setLoading(true);

        try {
            const canvas = editorRef.current.getImageScaledToCanvas();
            
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('avatar', blob, 'avatar.webp');

                const response = await uploadAvatarDirect(formData);

                if (response.status === 'success') {
                    if (onSuccess) onSuccess(response.data.avatarUrl);
                    onClose();
                }
            }, 'image/webp');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload photo');
            setLoading(false);
        }
    };

    const handleRemoveCurrent = async () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        setLoading(true);
        try {
            await removeProfilePhoto();
            if (onSuccess) onSuccess(null);
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
                    <h2 className="text-white font-semibold text-lg">{image ? 'Crop Photo' : 'Change Profile Photo'}</h2>
                </div>

                {image ? (
                    <div className="p-4 flex flex-col items-center">
                        <AvatarEditor
                            ref={editorRef}
                            image={image}
                            width={250}
                            height={250}
                            border={30}
                            borderRadius={125}
                            color={[38, 38, 38, 0.8]} 
                            scale={scale}
                            rotate={0}
                        />
                        <div className="w-full mt-4 flex items-center gap-3">
                            <span className="text-white text-sm">Zoom</span>
                            <input
                                type="range"
                                value={scale}
                                min="1"
                                max="2.5"
                                step="0.01"
                                onChange={(e) => setScale(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="flex w-full gap-3 mt-6">
                            <button
                                onClick={() => setImage(null)}
                                disabled={loading}
                                className="flex-1 py-2 text-sm text-white bg-[#363636] rounded hover:bg-[#404040]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCroppedImage}
                                disabled={loading}
                                className="flex-1 py-2 text-sm font-bold text-white bg-[#0095F6] rounded hover:bg-[#1877F2]"
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <button
                            onClick={handleUploadClick}
                            disabled={loading}
                            className="w-full py-3.5 text-sm font-bold text-[#0095F6] border-b border-[#363636] hover:bg-white/5 transition-colors disabled:opacity-50"
                        >
                            Upload Photo
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
                )}
            </div>
        </div>,
        document.body
    );
};

export default ChangeProfilePhotoModal;
