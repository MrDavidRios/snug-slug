interface HeartButtonProps {
  liked: boolean;
  onClick?: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ liked, onClick }) => {
  const heartColor = liked ? "#FF0000" : "#BDBDBD";

  return (
    <button
      className="heart"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {/* Heart icon */}
      <svg width="32" height="32" viewBox="0 0 55 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.9055 13.3268L27.5493 27.9707L42.1932 13.3268"
          stroke={heartColor}
          strokeWidth="25.4675"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};
