import { useState, useEffect } from 'react';
import { getGeneralSettings, updateGeneralSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'ar', name: 'Arabic' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'en', name: 'English' },
    { code: 'en-uk', name: 'English (UK)' },
    { code: 'es', name: 'Spanish' },
    { code: 'es-la', name: 'Spanish (Latin America)' },
    { code: 'fa', name: 'Persian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hr', name: 'Croatian' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ms', name: 'Malay' },
    { code: 'nb', name: 'Norwegian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese (Brazil)' },
    { code: 'pt-pt', name: 'Portuguese (Portugal)' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sv', name: 'Swedish' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'zh-cn', name: 'Chinese (Simplified)' },
    { code: 'zh-tw', name: 'Chinese (Traditional)' },
];

const Language = () => {
    const [loading, setLoading] = useState(true);
    const [selectedLang, setSelectedLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getGeneralSettings()
            .then(res => setSelectedLang(res.data.data.languageCode))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (code) => {
        const old = selectedLang;
        setSelectedLang(code);
        updateGeneralSettings({ languageCode: code }).catch(() => setSelectedLang(old));
    };

    const filteredLangs = languages.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Language</h2>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#efefef] dark:bg-[#262626] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
            </div>

            <h3 className="font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-800">App Language</h3>

            <div className="flex flex-col">
                {filteredLangs.map(lang => (
                    <label key={lang.code} className="flex items-center justify-between py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
                        <span className="text-base text-text-primary">{lang.name}</span>
                        <input
                            type="radio"
                            checked={selectedLang === lang.code}
                            onChange={() => handleChange(lang.code)}
                            className="w-5 h-5 accent-black dark:accent-white"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Language;
