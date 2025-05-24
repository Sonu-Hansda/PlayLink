import { useEffect, useRef, useState } from "react";
import SoundOnIcon from "../assets/icons/SoundIcon";
import SoundOffIcon from "../assets/icons/SoundOffIcon";
import FullScreenIcon from "../assets/icons/FullScreenIcon";

interface Props {
  file: File;
}

export default function VideoPlayer({ file }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [showControls, setShowControls] = useState(true);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch((err) => console.log("Playback failed", err));
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMute(newVolume === 0);
  };

  // Mute/unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMute;
    video.muted = newMuted;
    setIsMute(newMuted);
    if (!newMuted) setVolume(0.7); // Restore volume
  };

  // Fullscreen toggle
  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        console.error("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Hide controls after inactivity
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls) {
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isPlaying, showControls]);

  // Show controls on user activity
  const handleUserActivity = () => {
    if (!document.fullscreenElement) return;
    setShowControls(true);
  };

  // Attach event listeners when in fullscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const addListeners = () => {
      document.addEventListener("mousemove", handleUserActivity);
      document.addEventListener("keydown", handleUserActivity);
    };

    const removeListeners = () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };

    if (document.fullscreenElement) {
      addListeners();
    } else {
      removeListeners();
    }

    return removeListeners;
  }, []);

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("timeupdate", updateTime);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // Set duration once metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg w-full max-w-3xl mx-auto">
      {/* Video */}
      <video
        ref={videoRef}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full"
        muted={isMute}
        controls={false}
      >
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      <div
        className={`p-4 bg-gradient-to-t from-black to-gray-900 text-white transition-opacity duration-300 ${!showControls ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        onMouseEnter={handleUserActivity}
      >
        {/* Progress Bar */}
        <div className="mb-2 flex items-center">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Time Display */}
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}

        {/* Volume + Mute */}
        <div className="flex items-center justify-between space-x-2">

          <div className="flex items-center space-x-2.5 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="text-white hover:text-orange-400 focus:outline-none"
              aria-label={isMute ? "Unmute" : "Mute"}
            >
              {isMute ? (
                <SoundOffIcon className="size-6" />
              ) : (
                <SoundOnIcon className="size-6" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 absolute left-8 top-2.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Play/Pause Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-white hover:text-orange-400 focus:outline-none"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4h2v12H6zm6 0h2v12h-2z" />
                </svg>
              ) : (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4v12l10-6z" />
                </svg>
              )}
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen();
            }}
            className="text-white hover:text-orange-400 focus:outline-none"
            aria-label="Toggle Fullscreen"
          >
           <FullScreenIcon className="size-6" />
          </button>

        </div>
      </div>
    </div>
  );
}