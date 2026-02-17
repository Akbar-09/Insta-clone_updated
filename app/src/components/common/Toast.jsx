import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Heart, UserPlus } from 'lucide-react';

const Toast = ({ id, title, message, icon, type, onClose, onClick }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 4500); // Start exit animation slightly before duration

        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e) => {
        e.stopPropagation();
        setIsExiting(true);
        setTimeout(onClose, 300);
    };

    const getTypeIcon = () => {
        if (icon) return <img src={icon} alt="" className="w-10 h-10 rounded-full object-cover" />;

        switch (type) {
            case 'message':
                return <div className="p-2 bg-blue-500 rounded-full text-white"><MessageCircle size={20} /></div>;
            case 'like':
                return <div className="p-2 bg-red-500 rounded-full text-white"><Heart size={20} /></div>;
            case 'follow':
                return <div className="p-2 bg-blue-600 rounded-full text-white"><UserPlus size={20} /></div>;
            default:
                return <div className="p-2 bg-gray-500 rounded-full text-white"><MessageCircle size={20} /></div>;
        }
    };

    return (
        <div
            className={`
                pointer-events-auto
                w-full bg-white dark:bg-[#262626] 
                rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] 
                dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]
                border border-gray-100 dark:border-[#363636]
                p-4 flex items-center gap-3 cursor-pointer
                transition-all duration-300 ease-out
                ${isExiting ? 'opacity-0 translate-x-12' : 'opacity-100 translate-x-0 animate-in slide-in-from-right-4'}
            `}
            onClick={() => {
                if (onClick) onClick();
                onClose();
            }}
        >
            <div className="flex-shrink-0">
                {getTypeIcon()}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {message}
                </p>
            </div>

            <button
                onClick={handleClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;
