import { Button } from "../button/Button";
import { ConfirmButton } from "../button/confirm-button/ConfirmButton";
import { BackButton } from "../button/back-button/BackButton";
interface PopUpWindowProps {
    message: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
}
  
export const PopUpWindow: React.FC<PopUpWindowProps> = ({ message, onConfirm, onClose }) => {
    
    return (
      <div className="window-container">
        <div className="back-button">
           <BackButton onClick={onClose}/>
        </div>
        <div className="message-confirm">
            <div className="message">{message}</div>
            <div className="confirm-button"><Button text="Confirm" onClick={onConfirm}/></div>
          {/* Include onclick here */}
        </div>
      </div>
    );
  };