export type MessageResponse = {
    id: number;
    content: string;
    type: number;
    edited: boolean;
    deleted: boolean;
};

export type ChatResponse = {
    chat_id: string;
};

export type ChatBotResponse = {
    chat: ChatResponse
    messages: MessageResponse[];
};
