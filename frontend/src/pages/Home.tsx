import { useState } from "react";
import MusicIcon from "../assets/icons/MusicIcon";
import VideoIcon from "../assets/icons/VideoIcon";
import { useNavigate } from "react-router-dom";
import { useFileContext } from "../context/useFileContext";

export default function Home() {
    const navigate = useNavigate();
    const { files, type, error, addFiles, setType } = useFileContext();
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            addFiles(selectedFiles);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles) {
            addFiles(droppedFiles);
        }
    };

    const toggleType = (selectedType: "audio" | "video") => {
        setType(selectedType);
    };

    const handleStart = () => {
        if (files.length > 0 && type) {
            navigate("/player");
        }
    }
    
    return (
        <main
            id="content"
            className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-grid-white/[0.03] backdrop-blur-md min-h-screen"
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none"></div>

            {/* Content */}
            <div className="text-center z-10 w-3xl md:max-w-3xl mx-auto py-12">
                <h1 className="text-2xl text-white sm:text-4xl mb-2 font-medium">Share. Stream. Enjoy.</h1>
                <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl tracking-tight">
                    <span className="bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent">
                        PlayLink
                    </span>
                </h2>

                {/* Upload Box */}
                <div className="mt-12 bg-white/10 backdrop-blur-sm p-8 rounded-xl md:w-[600px] mx-auto border border-white/20 shadow-xl transition-all duration-300">

                    {/* Type Selector */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => toggleType('audio')}
                            className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${type === 'audio'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <MusicIcon className="size-6 mr-2" />
                            Music
                        </button>

                        <button
                            onClick={() => toggleType('video')}
                            className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${type === 'video'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <VideoIcon className="size-6 mr-2" />
                            Video
                        </button>
                    </div>

                    {/* File Drop Zone */}
                    <label
                        htmlFor="file-upload"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`block border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 text-center
              ${isDragging
                                ? "border-orange-400 bg-orange-500/10"
                                : "border-white/30 hover:border-orange-400 hover:bg-white/5"
                            }
            `}
                    >
                        <svg
                            className="w-12 h-12 mx-auto text-orange-400 transition-transform duration-300 group-hover:scale-110"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>

                        <h3 className="mt-4 text-lg font-medium text-white">Drop your files here</h3>
                        <p className="mt-2 text-sm text-white/70">or click to browse</p>
                        <input
                            id="file-upload"
                            type="file"
                            multiple={type === "audio"}
                            accept={type === 'audio' ? "audio/*" : type === 'video' ? "video/*" : ""}
                            onChange={handleFileChange}
                            className="sr-only"
                        />
                    </label>

                    {/* File Info */}
                    {files.length > 0 && (
                        <div className="mt-4 text-left text-sm text-white/80 bg-white/5 p-3 rounded-md">
                            {files.map((file, index) => (
                                <p key={index}>
                                    {file.name} – {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <p className="mt-2 text-red-400 text-sm text-left">{error}</p>}

                    {/* Submit Button */}
                    <button
                        disabled={files.length === 0 || !type}
                        onClick={handleStart}
                        className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform ${files.length > 0 && type
                            ? "bg-orange-500 text-white hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30"
                            : "bg-gray-600 text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        Start
                    </button>
                </div>
            </div>
        </main>
    );
}