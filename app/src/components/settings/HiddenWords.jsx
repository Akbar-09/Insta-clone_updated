import { useState, useEffect } from 'react';
import { getHiddenWordsSettings, updateHiddenWordsSettings, addHiddenWord, deleteHiddenWord } from '../../api/settingsApi';
import { Loader2, ArrowLeft, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HiddenWords = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ hideComments: false, advancedFilter: false, hideMessageRequests: false });
    const [customWords, setCustomWords] = useState([]);
    const [newWord, setNewWord] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getHiddenWordsSettings()
            .then(res => {
                setSettings(res.data.data.settings);
                setCustomWords(res.data.data.customWords);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const toggleSetting = (key) => {
        const val = !settings[key];
        const old = { ...settings };
        setSettings(prev => ({ ...prev, [key]: val }));
        updateHiddenWordsSettings({ [key]: val }).catch(() => setSettings(old));
    };

    const handleAddWord = async (e) => {
        e.preventDefault();
        if (!newWord.trim()) return;
        try {
            const res = await addHiddenWord(newWord);
            if (res.data.status === 'success') {
                setCustomWords([...customWords, res.data.data]);
                setNewWord('');
            }
        } catch (err) { console.error(err); }
    };

    const handleDeleteWord = async (id) => {
        const old = [...customWords];
        setCustomWords(prev => prev.filter(w => w.id !== id));
        try {
            await deleteHiddenWord(id);
        } catch (err) {
            console.error(err);
            setCustomWords(old);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const Toggle = ({ label, propKey, subLabel }) => (
        <div className="flex items-center justify-between mb-4">
            <div className="mr-4">
                <span className="text-base font-medium block">{label}</span>
                {subLabel && <p className="text-xs text-text-secondary mt-1">{subLabel}</p>}
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                    type="checkbox"
                    checked={settings[propKey]}
                    onChange={() => toggleSetting(propKey)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
            </label>
        </div>
    );

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Hidden Words</h2>
            </div>

            <h3 className="font-bold mb-4 mt-2">Offensive words and phrases</h3>
            <Toggle label="Hide comments" propKey="hideComments" subLabel="Comments that may be offensive will be hidden in a separate section." />
            <Toggle label="Advanced comment filtering" propKey="advancedFilter" subLabel="Additional comments that may contain offensive words and phrases will be hidden." />
            <Toggle label="Hide message requests" propKey="hideMessageRequests" subLabel="Message requests that may be offensive will be moved to the hidden requests folder." />

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-6" />

            <h3 className="font-bold mb-4">Custom words for messages and comments</h3>
            <p className="text-sm text-text-secondary mb-4">Add words or phrases to hide comments and message requests that contain them.</p>

            <form onSubmit={handleAddWord} className="relative mb-6">
                <input
                    type="text"
                    placeholder="Add words separated by commas"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="w-full bg-[#efefef] dark:bg-[#262626] rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {newWord && (
                    <button type="submit" className="absolute right-2 top-1.5 p-1 text-blue-500 hover:text-blue-600">
                        <Plus size={20} />
                    </button>
                )}
            </form>

            <div className="flex flex-wrap gap-2">
                {customWords.map(word => (
                    <span key={word.id} className="bg-[#efefef] dark:bg-[#262626] px-3 py-1 rounded-full text-sm flex items-center">
                        {word.word}
                        <button onClick={() => handleDeleteWord(word.id)} className="ml-2 text-gray-500 hover:text-gray-700">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default HiddenWords;
