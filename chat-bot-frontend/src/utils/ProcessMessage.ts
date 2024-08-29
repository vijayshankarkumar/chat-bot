import { MessageResponse } from "../types/ChatBotResponse";
import { Message, MessageType } from "../types/Message";

export const processMessages = (messageList: MessageResponse[]): Message[] => {
  return messageList.map(message => ({
      id: message.id,
      content: message.content,
      type: message.type === 0 ? MessageType.Bot : MessageType.User,
      edited: message.edited,
      deleted: message.deleted,
      options: message.type === 0 ? ['Create This Month Report', 'Call Lead'] : undefined,
  })) as Message[];
};

