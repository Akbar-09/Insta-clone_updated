import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { editPost } from '../api/postActionsApi';
import * as adApi from '../api/adApi';

const EditPostModal = ({ post, onClose, onUpdate }) => {
    const [caption, setCaption] = useState(post.caption || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            let response;
            if (post.isAd) {
                response = await adApi.updateAd(post.id, { caption });
            } else {
                response = await editPost(post.id, { caption });
            }

            if (response.data.status === 'success') {
                onUpdate(caption);
                onClose();
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update post');
        } finally {
            setLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#262626] w-full max-w-lg rounded-xl flex flex-col overflow-hidden animate-zoom-in">
                <div className="flex items-center justify-between p-4 border-b border-[#363636]">
                    <button onClick={onClose} className="text-white hover:opacity-70">Cancel</button>
                    <h2 className="text-white font-semibold">Edit Info</h2>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="text-[#0095f6] font-semibold hover:text-white disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Done'}
                    </button>
                </div>
                <div className="flex p-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        {/* Avatar placeholder or prop if available */}
                    </div>
                    <textarea
                        className="flex-1 bg-transparent text-white resize-none outline-none min-h-[100px]"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                    />
                </div>
                {/* Could add location editing etc later */}
            </div>
        </div>,
        document.body
    );
};

export default EditPostModal;
