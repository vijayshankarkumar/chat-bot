import React, { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { Message, MessageType } from "../../types/Message";
import "./ChatList.css";

interface ChatListProps {
  chatId: number;
  messages: Message[];
  onOptionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

const Chats: React.FC<ChatListProps> = ({messages, onOptionClick}) => {
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="message-list-container" ref={bodyRef}>
      {messages.map((message) => (
        <div key={message.id}>
          <Chat message={message} onOptionClick={onOptionClick} />
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
