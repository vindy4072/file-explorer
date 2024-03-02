import React from "react";
import "./FileExplorer.css";

interface ContextMenuProps {
  file: any; // You can replace 'any' with proper types
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  file,
  position,
  onClose,
}) => {
  const handleItemClick = (action: string) => {
    console.log(`File: ${file.name}, Action: ${action}`);
    onClose();
  };

  return (
    <div
      className="context-menu"
      style={{ left: position.x, top: position.y }}
      onClick={onClose}
    >
      <div
        className="context-menu-item"
        onClick={() => handleItemClick("Copy")}
      >
        Copy
      </div>
      <div
        className="context-menu-item"
        onClick={() => handleItemClick("Delete")}
      >
        Delete
      </div>
      <div
        className="context-menu-item"
        onClick={() => handleItemClick("Rename")}
      >
        Rename
      </div>
    </div>
  );
};

export default ContextMenu;
