import { createContext, useState, type ReactNode } from "react";

interface FileContextType {
  files: File[];
  type: "audio" | "video" | "";
  error: string;
  addFiles: (newFiles: FileList | null) => void;
  setType: (type: "audio" | "video") => void;
  resetContext: () => void;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider = ({ children }: FileProviderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [type, setTypeState] = useState<"audio" | "video" | "">("");
  const [error, setError] = useState<string>("");

  const isValidAudio = (file: File) =>
    file.type.startsWith("audio/") || ["mp3", "wav", "ogg"].includes(file.name.split(".").pop() || "");

  const isValidVideo = (file: File) =>
    file.type.startsWith("video/") || ["mp4", "webm", "ogg"].includes(file.name.split(".").pop() || "");

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles || !type) return;

    const filesArray = Array.from(newFiles);
    setError("");

    if (type === "audio") {
      const validFiles = filesArray.filter(isValidAudio);
      if (validFiles.length + files.length > 5) {
        setError("You can add up to 5 audio files only.");
        return;
      }
      setFiles((prev) => [...prev, ...validFiles]);
    }

    if (type === "video") {
      if (filesArray.length > 1) {
        setError("Only 1 video file allowed.");
        return;
      }

      const file = filesArray[0];
      if (file && file.size > 800 * 1024 * 1024) {
        setError("Video must be under 800 MB.");
        return;
      }

      if (file && !isValidVideo(file)) {
        setError("Invalid video format.");
        return;
      }

      setFiles(filesArray);
    }
  };

  const setType = (selectedType: "audio" | "video" | "") => {
    setTypeState(selectedType);
    setFiles([]);
    setError("");
  };

  const resetContext = () => {
    setFiles([]);
    setTypeState("");
    setError("");
  };

  return (
    <FileContext.Provider value={{ files, type, error, addFiles, setType, resetContext }}>
      {children}
    </FileContext.Provider>
  );
};