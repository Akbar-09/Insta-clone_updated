import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeartOverlay = ({ visible, onAnimationEnd }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (visible) {
            setAnimate(true);
            const timer = setTimeout(() => {
                setAnimate(false);
                if (onAnimationEnd) onAnimationEnd();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [visible, onAnimationEnd]);

    if (!visible && !animate) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className={`transform transition-all duration-500 ease-out 
                ${animate ? 'scale-125 opacity-0' : 'scale-0 opacity-100'}`}
                style={{ animation: animate ? 'heartBurst 0.8s ease-out forwards' : 'none' }}
            >
                <Heart size={100} fill="white" className="text-white drop-shadow-lg" />
            </div>
            <style jsx>{`
                @keyframes heartBurst {
                    0% { transform: scale(0); opacity: 0; }
                    15% { transform: scale(1.2); opacity: 1; }
                    30% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default HeartOverlay;
