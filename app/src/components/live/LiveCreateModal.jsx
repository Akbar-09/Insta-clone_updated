import React, { useState } from 'react';
import { useLive } from './LiveProvider';
import { X, Upload, Calendar } from 'lucide-react';

const LiveCreateModal = ({ onClose }) => {
    const { createStream } = useLive();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Social');
    const [visibility, setVisibility] = useState('public');
    const [thumbnail, setThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [tab, setTab] = useState('now'); // now, schedule
    const [scheduledAt, setScheduledAt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setThumbnail(e.target.files[0]);
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('visibility', visibility);
            if (thumbnail) formData.append('thumbnail', thumbnail);
            if (tab === 'schedule') {
                formData.append('scheduledAt', new Date(scheduledAt).toISOString());
            }

            await createStream(formData);
            onClose(); // Will transition to preview screen thanks to context
        } catch (error) {
            console.error("Failed to create stream", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden text-white border border-gray-800">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-semibold">New Live Stream</h2>
                    <button onClick={onClose} type="button" className="p-1 hover:bg-gray-800 rounded-full transition"><X size={20} /></button>
                </div>

                <div className="flex border-b border-gray-800">
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${tab === 'now' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setTab('now')}
                    >
                        Go Live Now
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${tab === 'schedule' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setTab('schedule')}
                    >
                        Schedule Stream
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary-500 outline-none"
                            placeholder="What are you streaming about?"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                            <select
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 outline-none"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="Social">Social</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Music">Music</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Visibility</label>
                            <select
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 outline-none"
                                value={visibility}
                                onChange={e => setVisibility(e.target.value)}
                            >
                                <option value="public">Public</option>
                                <option value="followers">Followers Only</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    {tab === 'schedule' && (
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                                value={scheduledAt}
                                onChange={e => setScheduledAt(e.target.value)}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Thumbnail</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750">
                            {previewUrl ? (
                                <img src={previewUrl} alt="preview" className="h-full w-full object-cover rounded-lg opacity-80" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400">Click to upload thumbnail</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !title || (tab === 'schedule' && !scheduledAt)}
                        className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Preparing...' : 'Prepare Live Stream'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LiveCreateModal;
