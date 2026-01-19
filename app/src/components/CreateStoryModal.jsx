import { useState, useRef, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { X, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const CreateStoryModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
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
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert('Please select an image or video file.');
        }
    };

    const handleShare = async () => {
        if (!selectedFile || !user) return;

        setLoading(true);
        try {
            // 1. Upload Media
            const formData = new FormData();
            formData.append('file', selectedFile);

            console.log('Uploading story media...');
            const uploadRes = await api.post('/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (uploadRes.data.status !== 'success') throw new Error('Upload failed');
            const { url, type } = uploadRes.data.data;

            // 2. Create Story
            console.log('Creating story...');
            const storyRes = await api.post('/stories', {
                userId: user.id,
                username: user.username,
                mediaUrl: url,
                mediaType: type || (selectedFile.type.startsWith('image/') ? 'IMAGE' : 'VIDEO')
            });

            if (storyRes.data.status === 'success') {
                console.log('Story created successfully!');
                onClose();
                window.location.reload(); // Reload to show new story
            } else {
                throw new Error('Story creation failed');
            }

        } catch (error) {
            console.error('Error creating story:', error);
            alert('Failed to create story. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent z-[10000]">
                <X size={32} />
            </button>

            <div
                className="bg-black rounded-xl overflow-hidden shadow-2xl w-[400px] h-[700px] max-h-[90vh] flex flex-col relative border border-gray-800 z-[10000]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="h-[50px] border-b border-gray-800 flex justify-between items-center px-4 shrink-0 bg-black z-10 text-white">
                    {preview ? (
                        <button onClick={handleBack} className="border-none bg-transparent cursor-pointer p-0 text-white">
                            <ArrowLeft size={24} />
                        </button>
                    ) : (
                        <div className="w-6"></div>
                    )}
                    <h1 className="font-semibold text-base text-center flex-grow">Add to Story</h1>
                    <div className="w-6"></div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col items-center justify-center bg-black relative">
                    {!preview ? (
                        <div
                            className={`w-full h-full flex flex-col items-center justify-center p-8 transition-colors ${isDragOver ? 'bg-zinc-900' : 'bg-black'}`}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                        >
                            <div className="mb-6">
                                <ImageIcon size={80} strokeWidth={1} className="text-white" />
                            </div>
                            <h2 className="text-xl font-light mb-6 text-white text-center">Drag photos or videos here</h2>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer"
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
                        <div className="w-full h-full relative flex items-center justify-center bg-black">
                            {selectedFile?.type.startsWith('video/') ? (
                                <video src={preview} className="max-w-full max-h-full object-contain" autoPlay loop muted playsInline />
                            ) : (
                                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                {preview && (
                    <div className="p-4 border-t border-gray-800 bg-black flex justify-center">
                        <button
                            onClick={handleShare}
                            disabled={loading}
                            className={`w-full bg-[#0095f6] text-white hover:bg-[#1877f2] py-2 rounded-lg font-semibold text-sm transition-colors border-none cursor-pointer ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Sharing...' : 'Share to Story'}
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default CreateStoryModal;
