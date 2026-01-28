import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const InstagramVideoPlayer = ({ src, poster }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // Default muted
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const val = (video.currentTime / video.duration) * 100;
            setProgress(isNaN(val) ? 0 : val);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        videoRef.current.currentTime = percentage * videoRef.current.duration;
    };

    return (
        <div
            className="relative w-full h-full bg-black flex items-center justify-center group cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain max-h-[85vh]"
                poster={poster}
                autoPlay
                playsInline
                loop
                muted={isMuted} // React attribute
            />

            {/* Centered Play Animation (Optional, simplified here) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <div className="bg-black/50 p-6 rounded-full backdrop-blur-sm">
                        <Play size={48} fill="white" className="text-white ml-2" />
                    </div>
                </div>
            )}

            {/* Controls Overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => e.stopPropagation()} // Prevent play toggle when clicking controls
            >
                {/* Progress Bar */}
                <div
                    className="w-full h-0.5 bg-gray-600/50 mb-3 cursor-pointer group/progress relative"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-white relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity transform scale-0 group-hover/progress:scale-100" />
                    </div>
                </div>

                <div className="flex justify-between items-center text-white">
                    <button onClick={togglePlay} className="hover:opacity-80 p-1">
                        {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                    </button>

                    <button onClick={toggleMute} className="hover:opacity-80 p-1">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>
            </div>

            {/* Sound Indicator (Top Right) - Constant visibility option or on hover */}
            <div className="absolute top-4 right-4 bg-black/50 p-1.5 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-300">
                {isMuted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
            </div>
        </div>
    );
};

export default InstagramVideoPlayer;
