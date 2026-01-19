import { useEffect, useState, useRef } from 'react';

const StoryProgressBar = ({ duration, activeIndex, count, isPaused, onCompleted }) => {
    return (
        <div className="absolute top-0 left-0 right-0 p-3 pt-4 z-30 flex gap-1.5 h-6 items-start bg-gradient-to-b from-black/60 to-transparent">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm relative">
                    {/* Completed Bars */}
                    {idx < activeIndex && (
                        <div className="absolute inset-0 bg-white w-full" />
                    )}

                    {/* Active Bar */}
                    {idx === activeIndex && (
                        <ProgressIndicator
                            duration={duration}
                            isPaused={isPaused}
                            onCompleted={onCompleted}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const ProgressIndicator = ({ duration, isPaused, onCompleted }) => {
    const [progress, setProgress] = useState(0);
    const lastTime = useRef(Date.now());
    const frameId = useRef(null);

    useEffect(() => {
        setProgress(0);
        lastTime.current = Date.now();
    }, []); // Reset on mount

    useEffect(() => {
        const animate = () => {
            const now = Date.now();
            const delta = now - lastTime.current;
            lastTime.current = now;

            if (!isPaused) {
                setProgress(prev => {
                    const nextProgress = prev + (delta / duration) * 100;
                    if (nextProgress >= 100) {
                        return 100;
                    }
                    return nextProgress;
                });
            }
            frameId.current = requestAnimationFrame(animate);
        };

        frameId.current = requestAnimationFrame(animate);

        return () => {
            if (frameId.current) cancelAnimationFrame(frameId.current);
        };
    }, [isPaused, duration]);

    // Separate effect to trigger completion callback to avoid updating state during render
    useEffect(() => {
        if (progress >= 100) {
            onCompleted();
        }
    }, [progress, onCompleted]);

    return (
        <div
            style={{ width: `${progress}%` }}
            className="absolute inset-0 bg-white h-full"
        />
    );
};

export default StoryProgressBar;
