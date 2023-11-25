import React from "react";
import { useState } from 'react';
import { Button } from "../button/Button";

interface chatInputProps {
    onSend: (message:string) => void;
    placeholder?: string;
  }

export const ChatInput: React.FC<chatInputProps> = ({ onSend, placeholder = 'Type a message...' }) => {

    const [message, setMessage] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSend(message);
        setMessage('')
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="chat-input">
            <input type="text" 
                    value={message} 
                    onChange={handleChange} 
                    placeholder={placeholder}
                    className="input-field"/>
            <Button text="Send"/>
        </form>
      </>
    );
  };
