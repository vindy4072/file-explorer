import React, { useState } from "react";
import FileData from "./types";
import "./FileExplorer.css";

interface FileProps {
  file: FileData;
  onClick: (file: FileData) => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: FileData
  ) => void;
  onToggle: () => void;
  isOpen: boolean;
  selectedFile: FileData | null;
}

const File: React.FC<FileProps> = ({
  file,
  onClick,
  onContextMenu,
  onToggle,
  isOpen,
  selectedFile,
}) => {
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (file.type === "folder") {
      setIsNestedOpen(!isNestedOpen);
      onToggle();
    } else {
      onClick(file);
      setIsClicked(!isClicked);
    }
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onContextMenu(event, file);
  };

  return (
    <div
      className={`file ${file.type} ${isNestedOpen ? "open" : ""} ${
        isClicked ? "selected" : ""
      }`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="row">
        <div className={file.type === "folder" ? "icon-folder" : "icon"} />
        <span>{file.name}</span>
      </div>
      {file.type === "folder" && isNestedOpen && file.data && (
        <div className="file-contents">
          {file.data.map((f: FileData, index: number) => (
            <File
              key={index}
              file={f}
              onClick={onClick}
              onContextMenu={onContextMenu}
              onToggle={onToggle}
              isOpen={isOpen}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default File;
