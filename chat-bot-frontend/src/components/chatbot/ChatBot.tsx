import React, { useState, useEffect } from "react";
import Chats from "../chats/ChatList";
import { Message, MessageType } from "../../types/Message";
import { ChatResponse, ChatBotResponse, MessageResponse } from "../../types/ChatBotResponse";
import "./ChatBot.css";
import avatar from "../../assets/cs.webp"
import { initiateChat, addMessage, deleteMessage, editMessage } from '../../service/ChatBotService'

const ChatBot: React.FC = () => {
    const [chatId, setChatId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [userResponse, setUserResponse] = useState<string>("");
    const [selectedMessageId, setSelectedMessageId] = useState<number>(0);

    const optionClick = async (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
            const chatData = await addMessage(chatId, { 'content': option, 'type': 1 }) as ChatBotResponse;
            setMessages(processMessageList(chatData.messages));
        }
    };

    // event handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (userResponse != "") {
            e.preventDefault();
            let chatData = null;
            if (selectedMessageId == 0) {
                chatData = await addMessage(chatId, { 'content': userResponse, 'type': 1 }) as ChatBotResponse;
            }
            else {
                chatData = await editMessage(chatId, selectedMessageId, { 'content': userResponse, 'type': 1 }) as ChatBotResponse;
            }
            setMessages(processMessageList(chatData.messages));
            setSelectedMessageId(0);
            setUserResponse("");
        }
    };

    const editClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = e.currentTarget.dataset ? Number(e.currentTarget.dataset.id) : 0;
        messages.forEach(message => {
            if (message.id === id) {
                setUserResponse(message.content);
                setSelectedMessageId(id);
            }
        });
    };

    const deleteClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = e.currentTarget.dataset ? Number(e.currentTarget.dataset.id) : 0;
        const chatData = await deleteMessage(chatId, id) as ChatBotResponse;
        setMessages(processMessageList(chatData.messages));
    };

    useEffect(() => {
        const startChat = async () => {
            try {
                const chatData = await initiateChat() as ChatBotResponse;
                setChatId(chatData.chat.chat_id);
                setMessages(processMessageList(chatData.messages));
            } catch (error) {
                throw error;
            }
        };
        startChat();
    }, []);

    const processMessageList = (messageList: MessageResponse[]) : Message[] => {
        return messageList.map(message => ({
            id: message.id,
            content: message.content,
            type: message.type === 0 ? MessageType.Bot : MessageType.User,
            edited: message.edited,
            deleted: message.deleted,
            options: message.type === 0 ? ['Create This Month Report', 'Call Lead'] : undefined,
        })) as Message[];
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
                onEditClick={editClick}
                onDeleteClick={deleteClick}
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
