import { useState } from 'react';
import { Search } from 'lucide-react';

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const languages = [
        'English', 'Afrikaans', 'Čeština', 'Dansk', 'Deutsch', 'Ελληνικά',
        'English (UK)', 'Español (España)', 'Español', 'Suomi', 'Français',
        'Bahasa Indonesia', 'Italiano', '日本語', '한국어', 'Bahasa Melayu',
        'Norsk', 'Nederlands', 'Polski', 'Português (Brasil)', 'Português (Portugal)',
        'Pусский', 'Svenska', 'ภาษาไทย', 'Filipino', 'Türkçe', '中文(简体)',
        '中文(繁體)'
    ];

    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-4">Language</h2>
            <p className="text-sm text-text-secondary mb-6">
                Choose the language you use on Jaadoe.
            </p>

            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#EFEFEF] dark:bg-[#262626] rounded-xl px-4 py-3 pl-10 focus:outline-none"
                />
                <div className="absolute left-3 top-3.5 text-text-secondary">
                    <Search size={18} />
                </div>
            </div>

            <div className="flex flex-col">
                {languages.map((lang) => (
                    <div
                        key={lang}
                        className="flex items-center justify-between py-3 border-b border-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                        onClick={() => setSelectedLanguage(lang)}
                    >
                        <span className="text-base font-medium">{lang}</span>
                        {selectedLanguage === lang && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Language;
