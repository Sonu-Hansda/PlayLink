import { useNavigate } from "react-router-dom";
import { useFileContext } from "../context/FileContext";
import AudioPlayer from "../components/AudioPlayer";
import VideoPlayer from "../components/VideoPlayer";

export default function Player() {
  const { files, type, resetContext } = useFileContext();
  const navigate = useNavigate();

  const shareLink = window.location.origin + "/stream/" + btoa(files[0].name);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  const handleStop = () => {
    resetContext();
    navigate("/");
  };

  if (files.length === 0 || !type) {
    navigate("/");
    return null;
  }

  return (
    <div className="w-full pb-12 md:py-12">
      <div className="flex flex-col md:flex-row md:w-3xl mx-auto items-center justify-between p-4 bg-gray-800 border-b border-gray-700 rounded-sm">
        <div className="text-sm truncate max-w-md sm:max-w-md md:max-w-lg text-orange-400 mb-2">
          <strong className="text-white">Share Link:</strong>{" "}
          <span>{shareLink}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-md text-sm transition"
          >
            Copy Link
          </button>
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="p-6 flex justify-center">
        {type === "audio" ? <AudioPlayer file={files[0]} playlist={files} /> : <VideoPlayer file={files[0]} />}
      </div>
    </div>
  );
}