import axios from 'axios';
import { ChatBotResponse, ChatResponse } from '../types/ChatBotResponse';

const API_URL = 'http://localhost:8001/chatbot';

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

const addMessage = async (chatId: string, message: any) => {
    try {
        const url = `${API_URL}/add-message/${chatId}`;
        const response = await axios.post(url, message);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

const editMessage = async (chatId: string, messageId: number, message: any) => {
    try {
        const url = `${API_URL}/edit-message/${chatId}/${messageId}`;
        const response = await axios.post(url, message);
        if (response.status === 200) {
            return response.data as ChatBotResponse;
        }
        throw new Error(response.data.message);
    } catch (error) {
        throw error;
    }
};

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
