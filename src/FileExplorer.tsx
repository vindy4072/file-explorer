import React, { useState } from "react";
import File from "./File";
import FileData from "./types";
import ContextMenu from "./ContextMenu";
import "./FileExplorer.css";

interface FileExplorerProps {
  files: FileData;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [contextMenuFile, setContextMenuFile] = useState<FileData | null>(null);

  const handleFileClick = (file: FileData) => {
    setSelectedFile(file);
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: FileData
  ) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuFile(file);
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
    setContextMenuFile(null);
  };

  const handleToggle = (fileName: string) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [fileName]: !prevState[fileName] || false,
    }));
  };

  return (
    <div className="file-explorer">
      <File
        file={files}
        onClick={handleFileClick}
        onContextMenu={handleContextMenu}
        onToggle={() => handleToggle(files.name)}
        isOpen={!!openFolders[files.name]}
        selectedFile={selectedFile}
      />
      {contextMenuFile && contextMenuPosition && (
        <ContextMenu
          file={contextMenuFile}
          onClose={handleCloseContextMenu}
          position={contextMenuPosition}
        />
      )}
    </div>
  );
};

export default FileExplorer;
