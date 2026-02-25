import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon, Mic, X, Play, Pause, Square, Clapperboard, Sticker } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StickerPicker from './StickerPicker';
import EmojiPicker from './EmojiPicker';
import { uploadMedia } from '../../api/mediaApi';
import { deleteConversation, unblockUser } from '../../api/messageApi';
import { useLiveKitCall } from '../call/CallProvider';

const VoicePlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const onTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setProgress((current / total) * 100);
    };

    const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-3 w-full">
            <button onClick={togglePlay} className="shrink-0 flex items-center justify-center">
                {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
            </button>
            <div className="flex-1 h-1 bg-white/30 dark:bg-gray-700 rounded-full relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-current transition-all duration-100 opacity-80"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-[10px] font-medium shrink-0 tabular-nums">
                {isPlaying ? formatTime(audioRef.current?.currentTime) : formatTime(duration)}
            </span>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />
        </div>
    );
};

const ChatWindow = ({ conversation, messages, currentUser, onSendMessage, updateOptimisticMessage, commitMessage, onToggleInfo, isTyping, handleTyping, onUpdate, socket }) => {
    const { startCall } = useLiveKitCall();

    const [newMessage, setNewMessage] = useState('');
    const [showStickers, setShowStickers] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        // Don't proxy blob URLs
        if (url.startsWith('blob:')) return url;

        // Convert absolute local gateway URLs to relative to use Vite proxy
        try {
            // Remove full origin if it matches any local IP/Port variations to make it relative
            const cleanedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');

            if (cleanedUrl !== url) {
                return cleanedUrl;
            }

            // If it's an R2 URL directly, try to convert it to our proxied endpoint
            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) {
                    return `/api/v1/media/files/${parts[1]}`;
                }
            }

            // Ensure media files are always routed through the api/v1 prefix if they are local paths
            if (url.includes('/media/files') && !url.includes('/api/v1/') && !url.startsWith('http')) {
                return url.replace('/media/files', '/api/v1/media/files');
            }
        } catch (e) {
            console.warn('URL proxying failed:', e);
        }

        return url;
    };

    const scrollToBottom = (behavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToBottom('auto');
    }, [conversation.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e?.preventDefault();
        if (!newMessage.trim()) return;
        onSendMessage(newMessage, 'text');
        setNewMessage('');
    };

    const handleEmojiSelect = (emoji) => {
        setNewMessage(prev => prev + emoji);
    };

    const handleUnblock = async () => {
        if (window.confirm("Are you sure you want to unblock this user?")) {
            try {
                await unblockUser(conversation.id);
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error("Unblock failed", error);
                alert("Failed to unblock user");
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Delete this chat?")) {
            try {
                await deleteConversation(conversation.id);
                if (onUpdate) onUpdate();
                navigate('/messages');
            } catch (error) {
                console.error("Delete failed", error);
                alert("Failed to delete chat");
            }
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        console.log('[ChatWindow] File selected, preview:', previewUrl);

        try {
            // 1. Send optimistic message IMMEDIATELY with blob preview
            const tempId = await onSendMessage('Sent an image', 'image', { mediaUrl: previewUrl });
            console.log('[ChatWindow] Optimistic message logic triggered, tempId:', tempId);

            setIsUploading(true);
            // 2. Upload in background
            const data = await uploadMedia(file, 'messages');
            console.log('[ChatWindow] Upload complete, server URL:', data.url);

            // 3. Finalize
            if (updateOptimisticMessage && commitMessage) {
                // First update the local UI to use the new server URL (but still marked as optimistic)
                updateOptimisticMessage(tempId, { mediaUrl: data.url });
                // Then commit to the server to get a real ID
                commitMessage(tempId, { content: 'Sent an image', type: 'image', mediaUrl: data.url });
            }

            setTimeout(() => URL.revokeObjectURL(previewUrl), 15000);
        } catch (error) {
            console.error("[ChatWindow] Upload failed", error);
            alert("Failed to upload image");
            URL.revokeObjectURL(previewUrl);
        } finally {
            setIsUploading(false);
            e.target.value = null;
        }
    };

    const handleSendSticker = (sticker) => {
        onSendMessage('Sent a sticker', 'sticker', { mediaUrl: sticker.url });
        setShowStickers(false);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                audioChunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const voicePreviewUrl = URL.createObjectURL(audioBlob);

                // 1. Send optimistic voice message
                const tempId = await onSendMessage('Voice message', 'voice', { mediaUrl: voicePreviewUrl });

                try {
                    setIsUploading(true);
                    const file = new File([audioBlob], `voice_${Date.now()}.wav`, { type: 'audio/wav' });
                    // 2. Upload in background
                    const data = await uploadMedia(file, 'messages');

                    // 3. Finalize
                    if (updateOptimisticMessage && commitMessage) {
                        updateOptimisticMessage(tempId, { mediaUrl: data.url });
                        commitMessage(tempId, { content: 'Voice message', type: 'voice', mediaUrl: data.url });
                    }

                    setTimeout(() => URL.revokeObjectURL(voicePreviewUrl), 10000);
                } catch (error) {
                    console.error("Voice upload failed", error);
                    alert("Failed to send voice message");
                    URL.revokeObjectURL(voicePreviewUrl);
                } finally {
                    setIsUploading(false);
                }
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Mic access denied", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const otherUser = conversation.otherUser || {};
    const displayName = otherUser.username || "Instagram User";
    const displayImage = otherUser.profilePicture || otherUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
    const isBlocked = otherUser.isBlocked;

    const formatMessageDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        if (date.toLocaleDateString() === now.toLocaleDateString()) return 'Today';
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toLocaleDateString() === yesterday.toLocaleDateString()) return 'Yesterday';
        return date.toLocaleDateString([], { month: 'long', day: 'numeric' });
    };

    const groupedContent = [];
    let lastDate = null;
    messages.forEach(msg => {
        const date = formatMessageDate(msg.createdAt);
        if (date !== lastDate) {
            groupedContent.push({ type: 'date', label: date });
            lastDate = date;
        }
        groupedContent.push({ type: 'message', data: msg });
    });

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-black relative">
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-gray-200 dark:border-[#363636] shrink-0">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => otherUser.username && navigate(`/profile/${otherUser.username}`)}>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700">
                        <img
                            src={displayImage}
                            alt={displayName}
                            className="w-full h-full object-cover"
                        />
                    </div >
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary leading-tight">{displayName}</span>
                        <span className="text-[10px] text-text-secondary">Active now</span>
                    </div>
                </div >
                <div className="flex items-center gap-4 text-text-primary">
                    <Phone
                        size={24}
                        className="cursor-pointer hover:opacity-50"
                        onClick={() => startCall(otherUser.id || otherUser.userId, displayName, displayImage, 'audio')}
                    />
                    <Video
                        size={24}
                        className="cursor-pointer hover:opacity-50"
                        onClick={() => startCall(otherUser.id || otherUser.userId, displayName, displayImage, 'video')}
                    />
                    <Info size={24} className="cursor-pointer hover:opacity-50" onClick={onToggleInfo} />
                </div>
            </div >

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-none" ref={scrollContainerRef}>
                <div className="flex flex-col min-h-full">
                    <div className="flex flex-col items-center justify-center pt-8 pb-10 w-full mb-auto shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700 mb-3">
                            <img
                                src={displayImage}
                                alt={displayName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary tracking-tight">{(otherUser.fullName && !/^User \d+$/.test(otherUser.fullName)) ? otherUser.fullName : displayName}</h2>
                        <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                            <span>{displayName}</span>
                            <span>•</span>
                            <span>Instagram</span>
                        </div>
                        <button
                            onClick={() => otherUser.username && navigate(`/profile/${otherUser.username}`)}
                            disabled={!otherUser.username}
                            className="mt-5 px-5 py-1.5 bg-[#efefef] dark:bg-[#262626] rounded-lg text-sm font-semibold text-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            View profile
                        </button>
                    </div>

                    <div className={`flex flex-col ${groupedContent.length < 5 ? '' : 'mt-auto'}`}>
                        {groupedContent.map((item, index, filteredArray) => {
                            if (item.type === 'date') {
                                return (
                                    <div key={`date-${index}`} className="text-center text-[11px] font-semibold text-text-secondary my-8 uppercase tracking-wider">
                                        {item.label}
                                    </div>
                                );
                            }

                            const msg = item.data;
                            const isOwn = String(msg.senderId) === String(currentUser?.id);
                            const isLastInGroup = index === filteredArray.length - 1 || filteredArray[index + 1].type === 'date';

                            return (
                                <div
                                    key={msg.id || index}
                                    className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-2`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[75%]`}>
                                        {!isOwn && (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-200 self-end mb-1">
                                                <img
                                                    src={displayImage}
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1">
                                            {/* Sticker Content */}
                                            {msg.type === 'sticker' && msg.mediaUrl && (!msg.mediaUrl.startsWith('blob:') || msg.isOptimistic) && (
                                                <div className="w-32 h-32 p-1">
                                                    <img src={getProxiedUrl(msg.mediaUrl)} alt="Sticker" className="w-full h-full object-contain" />
                                                </div>
                                            )}

                                            {/* Voice Content */}
                                            {msg.type === 'voice' && msg.mediaUrl && (!msg.mediaUrl.startsWith('blob:') || msg.isOptimistic) && (
                                                <div className={`flex items-center gap-3 px-4 py-3 rounded-[22px] min-w-[220px] ${isOwn ? 'bg-[#3797f0] text-white' : 'bg-[#efefef] dark:bg-[#262626] text-text-primary'}`}>
                                                    <VoicePlayer src={getProxiedUrl(msg.mediaUrl)} />
                                                </div>
                                            )}

                                            {/* Media Content (Image/Video) */}
                                            {msg.type === 'image' && msg.mediaUrl && (
                                                <div className="rounded-[22px] overflow-hidden mb-1 border border-gray-200 max-w-[240px] bg-gray-50 dark:bg-neutral-900 min-h-[100px] flex items-center justify-center">
                                                    <img
                                                        key={msg.mediaUrl}
                                                        src={getProxiedUrl(msg.mediaUrl)}
                                                        alt="Sent attachment"
                                                        className="w-full h-auto block"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://ui-avatars.com/api/?name=Image&background=f3f4f6&color=9ca3af&size=240&semibold=true';
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {msg.content && (msg.type === 'text' || msg.type === 'story_reply' || (msg.type === 'image' && msg.content !== 'Sent an image')) && (
                                                <div
                                                    className={`px-4 py-2 rounded-[22px] text-sm break-words ${isOwn
                                                        ? 'bg-[#3797f0] text-white'
                                                        : 'bg-[#efefef] dark:bg-[#262626] text-text-primary'
                                                        }`}
                                                >
                                                    {msg.content}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isOwn && isLastInGroup && (
                                        <div className="text-[10px] text-text-secondary px-2 mt-1">
                                            {msg.isSeen ? 'Seen' : 'Delivered'}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {isTyping && (
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`} alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-[#efefef] dark:bg-[#262626] px-4 py-2 rounded-[22px] flex items-center gap-1">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-2" />
                    </div>
                </div>
            </div>

            {/* Input Area or Blocked UI */}
            <div className="shrink-0 border-t border-gray-200 dark:border-[#363636] relative bg-white dark:bg-black">
                {isBlocked ? (
                    <div className="flex flex-col items-center">
                        <div className="py-6 flex flex-col items-center gap-1">
                            <h3 className="font-bold text-[16px] text-text-primary">You've blocked this account</h3>
                            <p className="text-[14px] text-text-secondary text-center px-4">
                                You can't message or video chat with {otherUser.username || 'this user'}.
                            </p>
                        </div>
                        <div className="w-full flex border-t border-gray-200 dark:border-[#363636]">
                            <button
                                onClick={handleUnblock}
                                className="flex-1 py-4 text-center text-[14px] font-semibold text-text-primary hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-r border-gray-200 dark:border-[#363636]"
                            >
                                Unblock
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-4 text-center text-[14px] font-semibold text-red-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-4">
                        {showStickers && (
                            <StickerPicker
                                onSelect={handleSendSticker}
                                onClose={() => setShowStickers(false)}
                            />
                        )}

                        {showEmojiPicker && (
                            <EmojiPicker
                                onSelect={handleEmojiSelect}
                                onClose={() => setShowEmojiPicker(false)}
                            />
                        )}

                        <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-[25px] px-4 py-2 bg-white dark:bg-black">
                            <Smile
                                size={24}
                                className={`cursor-pointer shrink-0 transition-colors ${showEmojiPicker ? 'text-[#0095F6]' : 'text-text-primary'}`}
                                onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickers(false); }}
                            />
                            <Sticker
                                size={24}
                                className={`cursor-pointer shrink-0 transition-colors ${showStickers ? 'text-[#0095F6]' : 'text-text-primary'}`}
                                onClick={() => { setShowStickers(!showStickers); setShowEmojiPicker(false); }}
                            />
                            <form onSubmit={handleSend} className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    className="w-full outline-none border-none focus:ring-0 focus:border-none text-sm bg-transparent text-text-primary placeholder-text-secondary"
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value);
                                        handleTyping(e.target.value.length > 0);
                                    }}
                                />
                            </form>
                            {newMessage.trim() && (
                                <button onClick={handleSend} className="text-[#0095F6] text-sm font-semibold px-2">Send</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
