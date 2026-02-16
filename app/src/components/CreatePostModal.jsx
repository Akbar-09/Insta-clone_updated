import { useState, useRef, useEffect, useContext } from 'react';
import { Image as ImageIcon, X, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { uploadMedia } from '../api/mediaApi';
import { AuthContext } from '../context/AuthContext';

const CreatePostModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file) {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image or video file.');
            }
        }
    };

    const [loading, setLoading] = useState(false);

    // ... existing handlePost ...

    const handlePost = async () => {
        if (!selectedFile) return;

        setLoading(true);
        try {
            // 1. Upload Media (R2 with Local Fallback)
            console.log('Uploading media...');
            const media = await uploadMedia(selectedFile, 'posts');

            // 2. Create Post
            console.log('Creating post with URL:', media.url);
            const postRes = await api.post('/posts', {
                userId: user.id || 1, // Fallback if context not fully loaded
                username: user.username || 'user',
                caption,
                mediaUrl: media.url,
                mediaType: selectedFile.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
                thumbnailUrl: media.thumbnailUrl // If backend generates/returns it
            });

            if (postRes.data.status === 'success') {
                console.log('Post created successfully!');
                onClose();
                window.location.reload();
            } else {
                throw new Error('Post creation failed');
            }

        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to share post: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
        setCaption('');
        // Reset file input value so same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const isVideo = selectedFile?.type?.startsWith('video/');

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm p-5" onClick={onClose}>
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-white hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent">
                <X size={28} />
            </button>

            {/* Modal Container */}
            <div
                className={`bg-white dark:bg-zinc-900 text-text-primary rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col
                    ${preview ? 'w-[800px] h-[550px]' : 'w-[500px] h-[550px]'}
                    max-w-[95vw] max-h-[90vh]`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="h-[42px] border-b border-border dark:border-white/10 flex justify-between items-center px-4 shrink-0">
                    {preview ? (
                        <button onClick={clearSelection} className="border-none bg-transparent cursor-pointer p-0">
                            <ArrowLeft size={24} className="text-text-primary" />
                        </button>
                    ) : (
                        <div className="w-6"></div> // Spacer
                    )}

                    <h1 className="font-semibold text-base text-center flex-grow text-text-primary">Create new post</h1>

                    {preview ? (
                        <button
                            onClick={handlePost}
                            disabled={loading}
                            className={`text-blue-btn font-semibold text-sm border-none bg-transparent cursor-pointer hover:text-blue-btn-hover ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Sharing...' : 'Share'}
                        </button>
                    ) : (
                        <div className="w-6"></div> // Spacer
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-grow flex overflow-hidden">
                    {!preview ? (
                        // Upload State
                        <div
                            className={`w-full h-full flex flex-col items-center justify-center p-8 transition-colors
                                ${isDragOver ? 'bg-gray-50 dark:bg-white/5' : 'bg-white dark:bg-zinc-900'}`}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                        >
                            <div className="mb-4 relative">
                                <ImageIcon size={60} strokeWidth={1} className="text-text-primary scale-110" />
                            </div>
                            <h2 className="text-xl font-light mb-5 text-text-primary">Drag photos and videos here</h2>
                            <button
                                onClick={triggerFileInput}
                                className="bg-blue-btn hover:bg-blue-btn-hover text-white px-4 py-1.5 rounded-[4px] font-semibold text-sm transition-colors border-none cursor-pointer"
                            >
                                Select from computer
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        // Preview & Caption State
                        <div className="w-full flex h-full">
                            {/* Image/Video Preview Side */}
                            <div className="w-[60%] h-full bg-black flex items-center justify-center">
                                {isVideo ? (
                                    <video src={preview} className="max-w-full max-h-full object-contain" controls />
                                ) : (
                                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                )}
                            </div>

                            {/* Details Side */}
                            <div className="w-[40%] flex flex-col border-l border-border dark:border-white/10 h-full">
                                <div className="p-4 flex items-center shrink-0">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-white/10 mr-3 overflow-hidden">
                                        <img src={user?.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop"} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary">{user?.username || 'user'}</span>
                                </div>

                                <div className="p-4 pt-0 flex-grow">
                                    <textarea
                                        placeholder="Write a caption..."
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        className="w-full h-full resize-none border-none outline-none text-sm font-inherit leading-5 bg-transparent text-text-primary"
                                        autoFocus
                                    />
                                </div>

                                <div className="p-4 border-t border-border dark:border-white/10 shrink-0 text-text-secondary flex justify-between items-center text-xs">
                                    <span>Add location</span>
                                    {/* LocationIcon */}
                                </div>
                                <div className="p-4 border-t border-border dark:border-white/10 shrink-0 text-text-secondary flex justify-between items-center text-xs">
                                    <span>Accessibility</span>
                                    {/* ChevronDown */}
                                </div>
                                <div className="p-4 border-t border-border dark:border-white/10 shrink-0 text-text-secondary flex justify-between items-center text-xs">
                                    <span>Advanced settings</span>
                                    {/* ChevronDown */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
