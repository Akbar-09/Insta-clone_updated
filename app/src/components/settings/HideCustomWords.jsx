import { useState, useEffect } from 'react';
import { getHiddenWordsSettings, updateHiddenWordsSettings, addHiddenWord, deleteHiddenWord } from '../../api/settingsApi';
import { Loader2, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HideCustomWords = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ customHideComments: false });
    const [customWords, setCustomWords] = useState([]);
    const [wordInput, setWordInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getHiddenWordsSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data.settings);
                    setCustomWords(res.data.data.customWords);
                }
            } catch (err) {
                console.error('Failed to load hidden words settings', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleAddWords = async () => {
        if (!wordInput.trim()) return;

        // Split by commas and add each word
        const wordsToAdd = wordInput.split(',').map(w => w.trim()).filter(w => w.length > 0);

        try {
            for (const word of wordsToAdd) {
                const res = await addHiddenWord(word);
                if (res.data.status === 'success') {
                    setCustomWords(prev => [...prev, res.data.data]);
                }
            }
            setWordInput('');
        } catch (err) {
            console.error('Failed to add words', err);
        }
    };

    const handleDeleteWord = async (id) => {
        const oldWords = [...customWords];
        setCustomWords(prev => prev.filter(w => w.id !== id));

        try {
            await deleteHiddenWord(id);
        } catch (err) {
            console.error('Delete failed', err);
            setCustomWords(oldWords); // Rollback
        }
    };

    const handleToggle = async () => {
        const newVal = !settings.customHideComments;
        const oldSettings = { ...settings };
        setSettings(prev => ({ ...prev, customHideComments: newVal }));

        try {
            await updateHiddenWordsSettings({ customHideComments: newVal });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-10 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Comment filtering</h2>
            </div>

            <div className="mb-8">
                <h3 className="text-[15px] font-bold mb-4">Keyword filters</h3>
                <p className="text-[14px] text-text-primary mb-6 leading-tight">
                    Hide comments that contain any of the words or phrases you type above from your posts.
                </p>

                <div className="relative mb-6">
                    <textarea
                        value={wordInput}
                        onChange={(e) => setWordInput(e.target.value)}
                        placeholder="Add keywords separated by commas"
                        className="w-full h-32 bg-white dark:bg-[#1c1c1c] border border-border rounded-lg p-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#aaa] resize-none scrollbar-hide"
                    />
                </div>

                <button
                    onClick={handleAddWords}
                    disabled={!wordInput.trim()}
                    className={`px-6 py-1.5 rounded-lg text-white font-semibold text-[14px] transition-colors ${wordInput.trim() ? 'bg-[#0095f6] hover:bg-[#1877f2]' : 'bg-[#0095f6]/50 cursor-not-allowed'}`}
                >
                    Submit
                </button>
            </div>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-medium">Hide Comments</span>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            type="checkbox"
                            checked={settings.customHideComments}
                            onChange={handleToggle}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-all duration-200"></div>
                    </label>
                </div>
                <p className="text-[12px] text-text-secondary leading-normal">
                    Hide comments that contain commonly reported keywords from your posts.
                </p>
            </div>

            {customWords.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-[14px] font-bold mb-4">Your keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {customWords.map(word => (
                            <div
                                key={word.id}
                                className="flex items-center bg-[#efefef] dark:bg-[#262626] px-3 py-1 rounded-full group hover:bg-[#dbdbdb] dark:hover:bg-[#363636] transition-colors"
                            >
                                <span className="text-[13px]">{word.word}</span>
                                <button
                                    onClick={() => handleDeleteWord(word.id)}
                                    className="ml-2 text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HideCustomWords;
