import React, { useState, useEffect } from "react";
import Chats from "../chats/ChatList";
import { Message, MessageType } from "../../types/Message";
import { ChatResponse, ChatBotResponse, MessageResponse } from "../../types/ChatBotResponse";
import "./ChatBot.css";
import avatar from "../../assets/cs.webp"
import user from "../../assets/user-img.jpg"
import { initiateChat, addMessage, deleteMessage, editMessage } from '../../service/ChatBotService'
import { processMessages } from "../../utils/ProcessMessage";

const ChatBot: React.FC = () => {
    const [chatId, setChatId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [userResponse, setUserResponse] = useState<string>("");
    const [selectedMessageId, setSelectedMessageId] = useState<number>(0);
    const [isChatWidgetVisible, setIsChatWidgetVisible] = useState(false);
    const [isStatusBarVisible, setIsStatusBarVisible] = useState(false);
    const [chatStatus, setChatStatus] = useState("");

    // On option click create a user message and call addMessage API
    const optionClick = async (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
            addLoadingMessage(option);
            const chatData = await addMessage(chatId, { 'content': option, 'type': 1 }) as ChatBotResponse;
            setMessages(processMessages(chatData.messages));
        }
    };

    // On user message input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    // On submit, call addMessage API if the there is not selected message for edit 
    // otherwise call editMessage API with selected message-id
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (userResponse != "") {
            e.preventDefault();
            try {
                let chatData = null;
                if (selectedMessageId == 0) {
                    // Added a dummy loading message
                    addLoadingMessage(userResponse);
                    const userMessage = userResponse;
                    setUserResponse("");
                    chatData = await addMessage(chatId, { 'content': userMessage, 'type': 1 }) as ChatBotResponse;
                }
                else {
                    chatData = await editMessage(chatId, selectedMessageId, { 'content': userResponse, 'type': 1 }) as ChatBotResponse;
                }
                setMessages(processMessages(chatData.messages));
                setSelectedMessageId(0);
                setUserResponse("");
            } catch (error) {
                setChatStatus("Something went wrong while sending message!!");
                setIsStatusBarVisible(true);
                setUserResponse("");
            }
        }
    };

    // On close widget button click, set chat widget invisible
    const onCloseWidget = (e: React.MouseEvent<HTMLElement>) => {
        setIsChatWidgetVisible(!isChatWidgetVisible);
    };

    // On close status bar button, set status bar invisible and
    // delete the previsouly added dummy loading message
    const onCloseStatus = (e: React.MouseEvent<HTMLElement>) => {
        messages.pop();
        setMessages(messages);
        setIsStatusBarVisible(false);
    };

    // On edit button click, set the selected message-id and prepopulate the user
    // message input with the selected message content to edit
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

    // On delete button click, call deleteMessage API with selected message-id
    const deleteClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = e.currentTarget.dataset ? Number(e.currentTarget.dataset.id) : 0;
        const chatData = await deleteMessage(chatId, id) as ChatBotResponse;
        setMessages(processMessages(chatData.messages));
    };

    // Call initiateChat API upon mounting the chat-widget componenet
    useEffect(() => {
        const startChat = async () => {
            try {
                const chatData = await initiateChat() as ChatBotResponse;
                setChatId(chatData.chat.chat_id);
                setMessages(processMessages(chatData.messages));
            } catch (error) {
                setChatStatus("Something went wrong while fetching messages!!");
                setIsStatusBarVisible(true);
            }
        };
        startChat();
    }, []);

    const addLoadingMessage = (userResponse: string) => {
        const messageId = messages.slice(-1)[0].id + 1;
        setMessages([...messages, {
            id: messageId,
            content: userResponse,
            edited: false,
            deleted: false,
            type: MessageType.User
        },
        {
            id: -1,
            content: "Loading",
            edited: false,
            deleted: false,
            type: MessageType.Bot
        }]);
    };

    return (
        <>
            {isChatWidgetVisible ? (
                <div className="chat-container">
                    <div className="bot-container">
                        <div className="close-widget" onClick={onCloseWidget} ><i className="fa fa-remove"></i></div>
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
                    <div className="chat-footer">
                        {isStatusBarVisible && (<div className="status-bar">
                            <div>{chatStatus}</div>
                            <div className="close-status" onClick={onCloseStatus}><i className="fa fa-remove"></i></div>
                        </div>)}
                        <form onSubmit={(e) => handleSubmit(e)} className="form-container">
                            <div className="bot-avatar">
                                <img src={user} alt="AI avatar" style={{ borderRadius: '50%', width: '25px', height: '25px' }}></img>
                            </div>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                value={userResponse}
                                type="text"
                                placeholder="Your question"
                                className="form-input"
                            ></input>
                            <button className="send-button">
                                <i className="fa fa-paper-plane"></i>
                            </button>
                            <button className="setting-button">
                                <i className="fa fa-gear"></i>
                            </button>
                        </form>
                    </div>
                </div>) : <div className="chat-widget-container" onClick={onCloseWidget}>
                <div className="chat-widget">
                    <img src={avatar} alt="AI avatar" style={{ borderRadius: '50%', width: '40px', height: '40px' }}></img>
                </div>
                <div className="widget-label">Chat with Ava!</div>
            </div>}
        </>
    );
};

export default ChatBot;
