import React from "react";
import ReactFocusLock from "react-focus-lock";
import LeftArrow from "../../assets/left-arrow.svg";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <ReactFocusLock>
      <div className="modal-backdrop" />
      <div className="modal">
        <div className="header-row">
          <button className="modal-close icon-button lg" onClick={onClose}>
            <img src={LeftArrow} alt="Close" />
          </button>
          <h2>{title}</h2>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </ReactFocusLock>
  );
};
