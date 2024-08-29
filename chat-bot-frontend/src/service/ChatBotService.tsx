import axios from 'axios';
import { ChatBotResponse, ChatResponse } from '../types/ChatBotResponse';

const API_URL = 'http://localhost:8000/chatbot';

// Mocking a delay promise to be resolved after sometime to demonstrate the loading message
const delay= (ms : any) => new Promise(resolve => setTimeout(resolve, ms));

const initiateChat = async () => {
    try {
        const response = await axios.get(`${API_URL}/initiate-chat`);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

// API for adding message with the given chatId which is returned by the initiateChat API with 
// the given message content
const addMessage = async (chatId: string, message: any) => {
    try {
        const url = `${API_URL}/add-message/${chatId}`;
        const response = await axios.post(url, message);
        await delay(2000);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

// API for editing message with the given chatId, messageId and edited message content
const editMessage = async (chatId: string, messageId: number, message: any) => {
    try {
        const url = `${API_URL}/edit-message/${chatId}/${messageId}`;
        const response = await axios.post(url, message);
        await delay(2000);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

// API for deleting message with the given chatId and messageId
const deleteMessage = async (chatId: string, messageId: number) => {
    try {
        const url = `${API_URL}/delete-message/${chatId}/${messageId}`;
        const response = await axios.post(url, messageId);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

export {initiateChat, addMessage, deleteMessage, editMessage};
