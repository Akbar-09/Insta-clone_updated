import { useState, useEffect } from 'react';
import { getContentPreferences, updateContentPreferences } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SensitiveContentControl = () => {
    const [loading, setLoading] = useState(true);
    const [level, setLevel] = useState('limit_more');
    const navigate = useNavigate();

    useEffect(() => {
        getContentPreferences()
            .then(res => setLevel(res.data.data.sensitiveContentLevel))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (val) => {
        const old = level;
        setLevel(val);
        updateContentPreferences({ sensitiveContentLevel: val }).catch(() => setLevel(old));
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const Option = ({ label, value, description }) => (
        <label className="flex items-start justify-between py-4 cursor-pointer">
            <div className="mr-4">
                <span className="text-base font-medium block">{label}</span>
                <p className="text-xs text-text-secondary mt-1 max-w-sm">{description}</p>
            </div>
            <input
                type="radio"
                checked={level === value}
                onChange={() => handleChange(value)}
                className="custom-radio mt-1"
            />
        </label>
    );

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Sensitive content control</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                Choose how much sensitive content you want to see from accounts you don't follow.
            </p>

            <Option
                label="Allow"
                value="allow"
                description="You may see more sensitive content."
            />
            <Option
                label="Limit (Default)"
                value="limit"
                description="You may see some sensitive content."
            />
            <Option
                label="Limit even more"
                value="limit_more"
                description="You may see less sensitive content."
            />
        </div>
    );
};

export default SensitiveContentControl;
