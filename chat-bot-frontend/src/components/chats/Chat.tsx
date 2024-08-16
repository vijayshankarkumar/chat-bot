import React, { useState, useEffect, useRef } from "react";
import { Message, MessageType } from "../../types/Message";
import avatar from "../../assets/cs.webp"
import "./ChatList.css";


interface ChatProps {
    message: Message;
    onOptionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

const Chat: React.FC<ChatProps> = ({ message, onOptionClick }) => {
    switch (message.type) {
        case MessageType.Bot:
            return (
                <div className="bot-message-container">
                    <div className="bot-avatar">
                        <img src={avatar} alt="AI avatar" style={{ borderRadius: '50%', width: '35px', height: '35px', marginRight: '5px' }}></img>
                    </div>
                    <div className="message-option-container">
                        <div className="message bot-message" key={message.id}>
                            {message.content}
                        </div>
                        <div className="message option-container">
                            {message.options ? (
                                message.options.map((option) => (
                                    <div className="option"
                                        onClick={(e) => onOptionClick(e)}
                                        data-id={option}
                                        key={option}
                                    >
                                        <div className="option-text">{option}</div>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            );
        case MessageType.User:
            return (
                <>
                <div className="user-message-containter">
                    <div className="message user-message" key={message.id}>
                        <div>{message.content}</div>
                    </div>
                </div>
                <div className="edit-delete-container">
                <button className="edit">
                    <i className="fa fa-edit"></i>
                </button>
                <button className="delete">
                    <i className="fa fa-remove"></i>
                </button>
            </div>
            </>
            );
    }
}

export default Chat;
