export enum MessageType {
    Bot = 'BOT',
    User = "USER",
}

export type Message = {
    id: number;
    content: string;
    type: MessageType;
    options?: string[];
    edited: boolean;
}
