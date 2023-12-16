import React from "react";

interface ArchiveButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isArchivedView: boolean;
}

export const ArchiveButton: React.FC<ArchiveButtonProps> = ({ onClick, isArchivedView }) => {
  return (
    <button
      className="archive-button lg"
      style={{ display: "flex", padding: `${isArchivedView ? "10px 20px" : "10px"}` }}
      onClick={onClick}
    >
      {isArchivedView ? (
        <p>Active Chats</p>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
            <rect x="2.14282" y="8.57129" width="25.7143" height="17.1429" fill="#BDBDBD" />
            <rect x="0.75" y="0.75" width="28.5" height="7.07143" stroke="#BDBDBD" strokeWidth="1.5" />
            <rect x="10.7144" y="15.8569" width="8.57143" height="2.57143" fill="white" />
          </svg>
          <p>Archived</p>
        </>
      )}
    </button>
  );
};