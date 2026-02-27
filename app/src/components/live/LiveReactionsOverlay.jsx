import React, { useEffect, useState, useCallback } from 'react';

const FloatingHeart = ({ id, onComplete }) => {
    return (
        <div
            className="absolute bottom-10 animate-float-up pointer-events-none opacity-0"
            style={{
                left: `${Math.random() * 80 + 10}%`,
                animationDuration: `${Math.random() * 2 + 2}s`
            }}
            onAnimationEnd={() => onComplete(id)}
        >
            <span className="text-pink-500 drop-shadow-md text-3xl">❤️</span>
        </div>
    );
};

const LiveReactionsOverlay = ({ socket }) => {
    const [hearts, setHearts] = useState([]);

    const addHeart = useCallback(() => {
        const id = Date.now() + Math.random().toString();
        setHearts(prev => [...prev, id]);
    }, []);

    const removeHeart = useCallback((id) => {
        setHearts(prev => prev.filter(h => h !== id));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('new_reaction', () => {
            addHeart();
            // Add a few more to make it look full
            setTimeout(addHeart, 100);
            setTimeout(addHeart, 300);
        });

        return () => {
            socket.off('new_reaction');
        };
    }, [socket, addHeart]);

    // CSS for animation to be added globally or styled components
    // We add inline styles for the keyframes
    return (
        <>
            <style>{`
                @keyframes float-up {
                    0% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                        transform: translateY(-20px) scale(1.2);
                    }
                    80% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-300px) scale(1);
                        opacity: 0;
                    }
                }
                .animate-float-up {
                    animation: float-up 3s ease-out forwards;
                }
            `}</style>
            <div className="absolute bottom-20 right-4 w-32 h-64 pointer-events-none z-20">
                {hearts.map(id => (
                    <FloatingHeart key={id} id={id} onComplete={removeHeart} />
                ))}
            </div>
        </>
    );
};

export default LiveReactionsOverlay;
