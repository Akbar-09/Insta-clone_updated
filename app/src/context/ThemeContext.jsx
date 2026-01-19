import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('instagram-theme');
        return storedTheme ? storedTheme : 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (targetTheme) => {
            if (targetTheme === 'dark') {
                root.classList.add('dark');
            } else if (targetTheme === 'light') {
                root.classList.remove('dark');
            } else if (targetTheme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemDark) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        applyTheme(theme);
        localStorage.setItem('instagram-theme', theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
