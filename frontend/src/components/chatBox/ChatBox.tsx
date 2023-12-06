import React from 'react';

interface ChatBoxProps{

}


// Potential props:
// Each users' id
// Their text, their time stamp?

// Would also need to create the sender card information

// need to know if talking to sublessor or apartment

// Receives two props - one for sublessor, one for sublessee
// Each one should contain array of messages that are time stamped


export const ChatBoxProps: React.FC<ChatBoxProps> = () => {

  // This array would be populated with your chat messages
  const messages = [
    { id: 1, text: 'Hello! I’m interested in subleasing your apartment.', isSender: false },
    { id: 2, text: 'Hi! Thanks for reaching out. I’m happy to sublease my apartment to you!', isSender: true }
  ];

  return (
    <div>
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg.text} isSender={msg.isSender} />
      ))}
    </div>
  );
};

export default ChatWindowTest;
