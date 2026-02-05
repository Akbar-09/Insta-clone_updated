import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon, Mic, X, Play, Pause, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StickerPicker from './StickerPicker';
import EmojiPicker from './EmojiPicker';
import { uploadMedia } from '../../api/mediaApi';
import { deleteConversation, unblockUser } from '../../api/messageApi';

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

const ChatWindow = ({ conversation, messages, currentUser, onSendMessage, onToggleInfo, isTyping, handleTyping, onUpdate }) => {
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
        // Keep focus as per standard emoji pickers
    };

    const handleUnblock = async () => {
        if (window.confirm("Are you sure you want to unblock this user?")) {
            try {
                await unblockUser(conversation.id);
                // alert("User unblocked"); // Optional
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

        try {
            setIsUploading(true);
            const data = await uploadMedia(file);
            onSendMessage('Sent an image', 'image', { mediaUrl: data.url });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
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
                try {
                    setIsUploading(true);
                    const file = new File([audioBlob], `voice_${Date.now()}.wav`, { type: 'audio/wav' });
                    const data = await uploadMedia(file);
                    onSendMessage('Voice message', 'voice', { mediaUrl: data.url });
                } catch (error) {
                    console.error("Voice upload failed", error);
                    alert("Failed to send voice message");
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
                    <Phone size={24} className="cursor-pointer hover:opacity-50" />
                    <Video size={24} className="cursor-pointer hover:opacity-50" />
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
                        <h2 className="text-xl font-bold text-text-primary tracking-tight">{otherUser.fullName || displayName}</h2>
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
                        {groupedContent.filter(item => {
                            if (item.type !== 'message') return true;
                            const msg = item.data;
                            // Filter out temporary blob URLs from previous test sessions
                            if (msg.mediaUrl && msg.mediaUrl.startsWith('blob:')) return false;
                            return true;
                        }).map((item, index, filteredArray) => {
                            if (item.type === 'date') {
                                return (
                                    <div key={`date-${index}`} className="text-center text-[11px] font-semibold text-text-secondary my-8 uppercase tracking-wider">
                                        {item.label}
                                    </div>
                                );
                            }

                            const msg = item.data;
                            const isOwn = msg.senderId === currentUser?.id;
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
                                            {msg.type === 'sticker' && msg.mediaUrl && !msg.mediaUrl.startsWith('blob:') && (
                                                <div className="w-32 h-32 p-1">
                                                    <img src={msg.mediaUrl} alt="Sticker" className="w-full h-full object-contain" />
                                                </div>
                                            )}

                                            {/* Voice Content */}
                                            {msg.type === 'voice' && msg.mediaUrl && !msg.mediaUrl.startsWith('blob:') && (
                                                <div className={`flex items-center gap-3 px-4 py-3 rounded-[22px] min-w-[220px] ${isOwn ? 'bg-[#3797f0] text-white' : 'bg-[#efefef] dark:bg-[#262626] text-text-primary'}`}>
                                                    <VoicePlayer src={msg.mediaUrl} />
                                                </div>
                                            )}

                                            {/* Media Content (Image/Video) */}
                                            {msg.type === 'image' && msg.mediaUrl && !msg.mediaUrl.startsWith('blob:') && (
                                                <div className="rounded-[22px] overflow-hidden mb-1 border border-gray-200 max-w-[240px]">
                                                    <img src={msg.mediaUrl} alt="Sent attachment" className="w-full h-auto" />
                                                </div>
                                            )}

                                            {/* Story Reply Preview */}
                                            {msg.type === 'story_reply' && (
                                                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-2 mb-1 border border-gray-200 dark:border-gray-800 overflow-hidden">
                                                    <div className="flex items-center gap-2 mb-2 px-1">
                                                        <div className="w-4 h-4 rounded-full bg-gray-300" />
                                                        <span className="text-[10px] font-semibold">Replying to story</span>
                                                    </div>
                                                    <div className="w-32 h-48 bg-gray-200 dark:bg-gray-800 rounded-lg relative overflow-hidden cursor-pointer group">
                                                        {msg.mediaUrl && !msg.mediaUrl.startsWith('blob:') ? (
                                                            <img src={msg.mediaUrl} alt="Story" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">Story expired</div>
                                                        )}
                                                    </div>
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
                        {/* Normal Input UI */}
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

                        {isRecording ? (
                            <div className="flex items-center gap-4 bg-[#efefef] dark:bg-[#262626] rounded-[25px] px-4 py-2">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                                    <div className="flex-1 h-3 flex items-center gap-[2px]">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="flex-1 bg-gray-400 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                                        ))}
                                    </div>
                                </div>
                                <button onClick={stopRecording} className="text-[#0095F6] text-sm font-semibold">Done</button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-[25px] px-4 py-2 bg-white dark:bg-black">
                                <Smile
                                    size={24}
                                    className={`cursor-pointer shrink-0 transition-colors ${showEmojiPicker ? 'text-[#0095F6]' : 'text-text-primary'}`}
                                    onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickers(false); }}
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
                                {newMessage.trim() ? (
                                    <button onClick={handleSend} className="text-[#0095F6] text-sm font-semibold px-2">Send</button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Mic size={24} className="cursor-pointer text-text-primary hover:text-gray-600 transition-colors" onClick={startRecording} />
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                        />
                                        <ImageIcon
                                            size={24}
                                            className="cursor-pointer text-text-primary hover:text-gray-600 transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
