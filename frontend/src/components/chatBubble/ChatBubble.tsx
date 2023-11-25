import React from "react";

interface ChatBubbleProps{
    message: string;
    isSender: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({message, isSender}) => {
    const bubbleClass = isSender ? 'chat-bubble sender' : 'chat-bubble receiver';

    return (
        <>
            <div className={bubbleClass}>
                <span className="message">{message}</span>
            </div>
        </>
    )
}