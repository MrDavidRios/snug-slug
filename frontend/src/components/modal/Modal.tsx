import React from "react";
import ReactFocusLock from "react-focus-lock";
import LeftArrow from "../../assets/left-arrow.svg";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  blurBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ title, children, id, onClose, blurBackdrop = false }) => {
  return (
    <ReactFocusLock>
      <div className={`modal-backdrop ${blurBackdrop ? "blur" : ""}`} />
      <div className="modal" id={id}>
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
