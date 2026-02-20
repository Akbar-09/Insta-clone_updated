import { useState, useRef, useEffect, useContext } from 'react';
import { Image as ImageIcon, X, ArrowLeft, Smile, Sticker as StickerIcon } from 'lucide-react';
import EmojiPicker from './messages/EmojiPicker';
import StickerPicker from './messages/StickerPicker';
import api from '../api/axios';
import { uploadMedia } from '../api/mediaApi';
import { AuthContext } from '../context/AuthContext';

const CreatePostModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [hashtagSuggestions, setHashtagSuggestions] = useState([]);
    const [lastHashtag, setLastHashtag] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const fileInputRef = useRef(null);

    const handleCaptionChange = async (e) => {
        const value = e.target.value;
        setCaption(value);

        // Character limit logic (optional, UI already shows it)
        if (value.length > 2200) return;

        // Hashtag detection
        const words = value.split(/\s/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('#')) {
            const query = lastWord.substring(1);
            setLastHashtag(lastWord);
            if (query.length > 0) {
                try {
                    const res = await api.get(`/search/hashtags?q=${query}`);
                    if (res.data.status === 'success') {
                        setHashtagSuggestions(res.data.data);
                    }
                } catch (err) {
                    console.error('Hashtag fetch error:', err);
                }
            } else {
                setHashtagSuggestions([]);
            }
        } else {
            setHashtagSuggestions([]);
        }
    };

    const selectHashtag = (tag) => {
        const words = caption.split(/\s/);
        // Replace the last word (which is the search term) with the selected hashtag
        words[words.length - 1] = tag;
        setCaption(words.join(' ') + ' ');
        setHashtagSuggestions([]);
    };

    const handleEmojiSelect = (emoji) => {
        setCaption(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const handleStickerSelect = (sticker) => {
        // Since it's a caption, we can either append a hashtag or just the word
        // or a placeholder. Instagram doesn't support "stickers" in captions.
        // We'll append it as a hashtag if it's descriptive, or just ignore.
        // Given the request, we'll append its category as a hashtag.
        setCaption(prev => prev + `#${sticker.category} `);
        setShowStickerPicker(false);
    };

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
                    ${preview ? 'w-[900px] h-[650px]' : 'w-[500px] h-[550px]'}
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
                            <div className="w-[60%] h-full bg-black flex items-center justify-center relative">
                                {isVideo ? (
                                    <video src={preview} className="max-w-full max-h-full object-contain" controls />
                                ) : (
                                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                )}
                                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg flex items-center shadow-lg">
                                    Click photo to tag people
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black/60"></div>
                                </div>
                            </div>

                            {/* Details Side */}
                            <div className="w-[40%] flex flex-col border-l border-border dark:border-white/10 h-full bg-white dark:bg-zinc-900 overflow-y-auto custom-scrollbar">
                                <div className="p-4 flex items-center shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 mr-3 overflow-hidden border border-border dark:border-white/10">
                                        <img src={user?.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop"} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary">{user?.username || 'user'}</span>
                                </div>

                                <div className="px-4 flex-grow flex flex-col relative min-h-[300px]">
                                    <textarea
                                        placeholder="Write a caption..."
                                        value={caption}
                                        onChange={(e) => handleCaptionChange(e)}
                                        className="w-full flex-grow resize-none border-none outline-none text-base font-inherit leading-5 bg-transparent text-text-primary min-h-[200px]"
                                        autoFocus
                                    />

                                    <div className="flex justify-between items-center py-2 border-b border-border dark:border-white/10 shrink-0 relative">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickerPicker(false); }}
                                                className={`border-none bg-transparent cursor-pointer transition-colors ${showEmojiPicker ? 'text-blue-btn' : 'text-text-secondary hover:text-text-primary'}`}
                                            >
                                                <Smile size={20} />
                                            </button>
                                        </div>
                                        <span className="text-zinc-500 text-[10px]">{caption.length}/2,200</span>

                                        {showEmojiPicker && (
                                            <div className="absolute bottom-full left-0 mb-2">
                                                <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
                                            </div>
                                        )}
                                        {showStickerPicker && (
                                            <div className="absolute bottom-full left-0 mb-2">
                                                <StickerPicker onSelect={handleStickerSelect} onClose={() => setShowStickerPicker(false)} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Hashtag Suggestions */}
                                    {hashtagSuggestions.length > 0 && (
                                        <div className="absolute left-0 right-0 bottom-0 bg-white dark:bg-zinc-900 border-t border-border dark:border-white/10 max-h-[200px] overflow-y-auto z-10 shadow-xl">
                                            {hashtagSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => selectHashtag(suggestion.content)}
                                                    className="px-4 py-3 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer border-b border-border dark:border-white/5 last:border-0"
                                                >
                                                    <div className="font-semibold text-sm text-text-primary">{suggestion.content}</div>
                                                    <div className="text-xs text-zinc-500">{suggestion.metadata?.postCount || 0} posts</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-b border-border dark:border-white/10 shrink-0 text-text-primary flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5">
                                    <span>Add location</span>
                                    <svg aria-label="Add location" color="currentColor" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M12.053 8.105a3.557 3.557 0 1 0 0 7.114 3.557 3.557 0 0 0 0-7.114Zm0 5.168a1.611 1.611 0 1 1 0-3.222 1.611 1.611 0 0 1 0 3.222Z"></path><path d="M12 0C7.01 0 3 4.01 3 9c0 5.143 5.487 11.161 8.234 13.887a1.066 1.066 0 0 0 1.532 0c2.747-2.726 8.234-8.744 8.234-13.887 0-4.99-4.01-9-9-9Zm0 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"></path></svg>
                                </div>
                                <div className="p-4 border-b border-border dark:border-white/10 shrink-0 text-text-primary flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5">
                                    <span>Accessibility</span>
                                    <svg aria-label="Down chevron" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z" transform="rotate(180 12 12)"></path></svg>
                                </div>
                                <div className="p-4 shrink-0 text-text-primary flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5">
                                    <span>Advanced settings</span>
                                    <svg aria-label="Down chevron" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z" transform="rotate(180 12 12)"></path></svg>
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
