import React from "react";
import { ChatInput } from "../../components/chatInput/ChatInput";

export const ChatWindowTest: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log("Message to send:", message);
    // Here you would handle the message sending logic (e.g., updating state, sending to an API, etc.)
  };

  return (
    <div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
