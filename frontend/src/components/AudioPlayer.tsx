import { useEffect, useRef, useState } from "react";

interface Props {
  file: File;
  playlist: File[];
}

export default function AudioPlayer({ file, playlist }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>("");

  // Initialize with first file
  useEffect(() => {
    if (playlist.length > 0 && !audioUrl) {
      const url = URL.createObjectURL(playlist[0]);
      setAudioUrl(url);
      setCurrentTrackIndex(0);
    }
  }, [playlist, audioUrl]);

  // Track name 
  const trackName = playlist[currentTrackIndex]?.name.split(".").slice(0, -1).join(".") || "Unknown Track";
  const artist = "Unknown Artist";

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      playTrack(nextIndex);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      alert("Failed to play audio. Check console for details.");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrackIndex, playlist]);

  // Handle file prop changes
  useEffect(() => {
    const index = playlist.findIndex(f => f.name === file.name);
    if (index !== -1 && index !== currentTrackIndex) {
      playTrack(index);
    }
  }, [file]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
      alert("Playback failed. Please interact with the page first.");
    }
  };

  const playTrack = (index: number) => {
    const newFile = playlist[index];
    if (!newFile) return;

    // Cleanup old URL
    if (audioUrl) URL.revokeObjectURL(audioUrl);

    // Create new URL and update state
    const url = URL.createObjectURL(newFile);
    setAudioUrl(url);
    setCurrentTrackIndex(index);

    // Update audio source and play
    const audio = audioRef.current;
    if (audio) {
      audio.src = url;
      audio.load(); // Important to reload with new source
      if (isPlaying) {
        setTimeout(() => {
          audio.play().catch(err => console.error("Auto-play failed:", err));
        }, 100); // Small delay to ensure load completes
      }
    }
  };

  const goToPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(nextIndex);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="md:min-h-screen bg-gray-900 text-white flex flex-col-reverse md:flex-row rounded-sm px-2">
      {/* Playlist Sidebar */}
      <div className="w-full md:w-64 px-12 md:p-4 overflow-y-auto border-b md:border-r border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Your Playlist</h2>
        <ul className="space-y-2">
          {playlist.map((track, index) => {
            const isCurrent = index === currentTrackIndex;
            const isUpcoming = index > currentTrackIndex;

            return (
              <li
                key={index}
                onClick={() => playTrack(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform ${isCurrent
                  ? "bg-orange-400 text-black font-bold scale-105 z-10 relative"
                  : "hover:bg-gray-700"
                  } ${isUpcoming ? "opacity-80 hover:opacity-100" : ""
                  } ${isCurrent ? "animate-slideDown" : ""
                  }`}
              >
                <div className="font-medium">{track.name.slice(0, 40)}...</div>
                <div className={`text-xs ${isCurrent ? 'text-gray-100' : 'text-gray-400'}`}>Unknown Artist</div>

                {/* Upcoming indicator */}
                {isUpcoming && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Player */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-white">
          {/* Album Art */}
          <div className="w-full h-48 bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
            <span className="text-4xl font-bold text-white">{trackName.charAt(0)}</span>
          </div>

          {/* Track Info */}
          <div className="mb-4 px-1">
            <h3 className="font-semibold truncate">{trackName}</h3>
            <p className="text-sm text-gray-400">{artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goToPrevious}
              className="text-white hover:text-orange-400 focus:outline-none"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            </button>

            <button
              onClick={togglePlayPause}
              className="bg-green-500 hover:bg-green-400 p-3 rounded-full focus:outline-none transition-transform hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4h2v12H6zm6 0h2v12h-2z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4v12l10-6z" />
                </svg>
              )}
            </button>

            <button
              onClick={goToNext}
              className="text-white hover:text-orange-400 focus:outline-none"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </button>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(audioRef.current.duration);
              }
            }}
          />
        </div>
      </div>

      {/* Add Animation Keyframes */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}