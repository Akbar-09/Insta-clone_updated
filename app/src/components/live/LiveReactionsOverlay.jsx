import React, { useEffect, useState, useCallback } from 'react';

const FloatingHeart = ({ item, onComplete }) => {
    return (
        <div
            className="absolute bottom-10 animate-float-up pointer-events-none opacity-0 drop-shadow-lg"
            style={{
                left: `${Math.random() * 80 + 10}%`,
                animationDuration: `${Math.random() * 2 + 2}s`
            }}
            onAnimationEnd={() => onComplete(item.id)}
        >
            <span className="text-4xl">{item.emoji}</span>
        </div>
    );
};

const LiveReactionsOverlay = ({ socket }) => {
    const [hearts, setHearts] = useState([]);

    const addReaction = useCallback((emoji) => {
        const id = Date.now() + Math.random().toString();
        setHearts(prev => [...prev, { id, emoji: emoji || '❤️' }]);
    }, []);

    const removeReaction = useCallback((id) => {
        setHearts(prev => prev.filter(h => h.id !== id));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('new_reaction', (data) => {
            const emoji = data?.emoji || '❤️';
            addReaction(emoji);
            // Add a few more to make it look full
            setTimeout(() => addReaction(emoji), 100);
            setTimeout(() => addReaction(emoji), 300);
        });

        return () => {
            socket.off('new_reaction');
        };
    }, [socket, addReaction]);

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
            <div className="absolute bottom-20 right-20 md:right-24 w-32 h-64 pointer-events-none z-20">
                {hearts.map(item => (
                    <FloatingHeart key={item.id} item={item} onComplete={removeReaction} />
                ))}
            </div>
        </>
    );
};

export default LiveReactionsOverlay;
