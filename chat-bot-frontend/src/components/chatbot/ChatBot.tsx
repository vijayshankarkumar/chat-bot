import React, { useState } from "react";
import Chats from "../chats/ChatList";
import { Message, MessageType } from "../../types/Message";
import "./ChatBot.css";
import avatar from "../../assets/cs.webp"

const ChatBot: React.FC = () => {
    const [chatId, setChatId] = useState<number>(0);
    const [messageId, setMessageId] = useState<number>(0);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            content: "Hi Jane, Amazing how Mosey is simplifying state compliance for buiness across the world!",
            options: ["Create Report This Month", "Call Lead"],
            type: MessageType.Bot,
            edited: false,
        }
    ]);
    const [userResponse, setUserResponse] = useState<string>("");

    const optionClick = (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
            setMessageId(messageId + 1);
            setMessages([...messages, {
                id: messageId,
                content: option,
                type: MessageType.User,
                edited: false,
            }]);
        }
    };

    // event handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (userResponse != "") {
            e.preventDefault();
            setMessageId(messageId + 1);
            setMessages([...messages, {
                id: messageId,
                content: userResponse,
                type: MessageType.User,
                edited: false,
            }]);
            setUserResponse("");
        }
    };

    return (
        <div className="chat-container">
            <div className="bot-container">
                <div className="bot-avatar">
                    <img src={avatar} alt="AI avatar" style={{ borderRadius: '50%', width: '40px', height: '40px' }}></img>
                </div>
                <div className="bot-info">
                    <div className="bot-title">Hey👋, I'm Ava</div>
                    <div className="bot-say">Ask me anything or pick a place to start</div>
                </div>
            </div>
            <Chats
                chatId={chatId}
                messages={messages}
                onOptionClick={optionClick}
            />
            <form onSubmit={(e) => handleSubmit(e)} className="form-container">
                <div className="user-icon">
                    <i className="fa fa-user-circle-o"></i>
                </div>
                <input
                    onChange={(e) => handleInputChange(e)}
                    value={userResponse}
                    type="text"
                    placeholder="Your question"
                    className="form-input"
                ></input>
                <button className="setting-button">
                    <i className="fa fa-gear"></i>
                </button>
                <button className="send-button">
                    <i className="fa fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default ChatBot;
