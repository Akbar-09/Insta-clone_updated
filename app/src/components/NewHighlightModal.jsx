import { useState } from 'react';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom';
import StoryPickerModal from './StoryPickerModal';

const NewHighlightModal = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState(1); // 1: Name input, 2: Story picker
    const [highlightName, setHighlightName] = useState('');
    const [showStoryPicker, setShowStoryPicker] = useState(false);

    const handleNext = () => {
        if (highlightName.trim()) {
            setShowStoryPicker(true);
        }
    };

    const handleStoriesSelected = (selectedStories) => {
        setShowStoryPicker(false);
        if (onSuccess) {
            onSuccess(highlightName, selectedStories);
        }
        onClose();
    };

    return ReactDOM.createPortal(
        <>
            {!showStoryPicker && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#262626] w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl animate-zoom-in">
                        {/* Header */}
                        <div className="border-b border-[#363636] px-4 py-3 flex items-center justify-between">
                            <button
                                onClick={onClose}
                                className="text-white hover:opacity-70 transition-opacity"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-white font-semibold text-base absolute left-1/2 transform -translate-x-1/2">
                                New highlight
                            </h2>
                            <button
                                onClick={handleNext}
                                disabled={!highlightName.trim()}
                                className={`text-sm font-semibold transition-opacity ${highlightName.trim()
                                        ? 'text-[#0095F6] hover:text-white cursor-pointer'
                                        : 'text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-white text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={highlightName}
                                    onChange={(e) => setHighlightName(e.target.value)}
                                    placeholder="Highlight name"
                                    maxLength="15"
                                    autoFocus
                                    className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors"
                                />
                                <div className="text-right text-xs text-gray-500 mt-1">
                                    {highlightName.length}/15
                                </div>
                            </div>

                            <div className="text-xs text-gray-400 text-center">
                                Give your highlight a name that represents the stories you'll add to it.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showStoryPicker && (
                <StoryPickerModal
                    highlightName={highlightName}
                    onClose={() => {
                        setShowStoryPicker(false);
                        onClose();
                    }}
                    onSuccess={handleStoriesSelected}
                />
            )}
        </>,
        document.body
    );
};

export default NewHighlightModal;
