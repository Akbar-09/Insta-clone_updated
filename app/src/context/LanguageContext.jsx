
import { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';
import { getGeneralSettings, updateGeneralSettings } from '../api/settingsApi';
import { AuthContext } from './AuthContext';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    // Initialize from localStorage or default to 'en'
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('app_language') || 'en';
    });

    // Fetch language settings from backend when user logs in
    useEffect(() => {
        if (user) {
            getGeneralSettings()
                .then(res => {
                    if (res.data?.data?.languageCode) {
                        const backendLang = res.data.data.languageCode;
                        setLanguageState(backendLang);
                        localStorage.setItem('app_language', backendLang);
                    }
                })
                .catch(err => console.error("Failed to fetch language settings:", err));
        }
    }, [user]);

    const changeLanguage = async (langCode) => {
        // Optimistic update
        setLanguageState(langCode);
        localStorage.setItem('app_language', langCode);

        // Update backend
        try {
            if (user) {
                await updateGeneralSettings({ languageCode: langCode });
            }
        } catch (error) {
            console.error("Failed to update language on backend:", error);
            // Optionally revert on failure, but for language usually keeping local is fine
        }
    };

    const t = (key) => {
        const langData = translations[language] || translations['en'];
        return langData[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
