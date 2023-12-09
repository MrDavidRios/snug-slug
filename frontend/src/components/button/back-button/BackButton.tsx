interface BackButtonProps {
    onClick: () => void;
  }
  
  export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  
    return (
      <div className="back-button" onClick={onClick}>
        {/* Back button icon */}
        <svg width="42" height="27" viewBox="0 0 42 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.06648 12.0666C4.37275 12.7604 4.37275 13.8851 5.06648 14.5789L16.3715 25.8839C17.0652 26.5776 18.19 26.5776 18.8837 25.8839C19.5774 25.1901 19.5774 24.0654 18.8837 23.3716L8.83481 13.3228L18.8837 3.27387C19.5774 2.58014 19.5774 1.45538 18.8837 0.761652C18.19 0.0679216 17.0652 0.0679216 16.3715 0.761652L5.06648 12.0666ZM35.6772 11.5463L6.32259 11.5463V15.0992L35.6772 15.0992V11.5463Z" fill="#9BDDFF"/>
        </svg>
      </div>
    );
  };
  