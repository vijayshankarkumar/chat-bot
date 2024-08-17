import React, { useEffect, useRef } from "react";
import Chat from "./Chat";
import { Message } from "../../types/Message";
import "./ChatList.css";

interface ChatListProps {
  chatId: string;
  messages: Message[];
  onOptionClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onEditClick: (ev: React.MouseEvent<HTMLElement>) => Promise<void>;
  onDeleteClick: (ev: React.MouseEvent<HTMLElement>) => Promise<void>;
}

const Chats: React.FC<ChatListProps> = ({ messages, onOptionClick, onEditClick, onDeleteClick }) => {
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
          <Chat message={message}
            onOptionClick={onOptionClick}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
             />
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
