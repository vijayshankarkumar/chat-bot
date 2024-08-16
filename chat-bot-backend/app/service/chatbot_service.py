from typing import List, Dict
import uuid
from datetime import datetime
from app.models.chat_model import Chat
from app.models.message_model import Message
from app.models.chatbot_response_model import ChatBotResponse

class ChatBotService:
    def __init__(self) -> None:
        self.chat_id_to_chat_mapping: Dict[str, Chat] = {}
        self.chat_id_to_message_mapping: Dict[str, List[Message]] = {}

    def initiate_chat(self) -> Chat:
        chat_id = str(uuid.uuid4())
        message = Message(id=1, 
                          content="Hi Jane, Amazing how Mosey is simplifying state compliance for buiness across the world!",
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
        chat = Chat(user_id=124, 
                    chat_id=chat_id, 
                    created_on=datetime.now(), 
                    updated_on=datetime.now())
        self.chat_id_to_chat_mapping[chat_id] = chat
        self.chat_id_to_message_mapping[chat_id] = []
        self.chat_id_to_message_mapping[chat_id].append(message)
        return ChatBotResponse(chat=chat, messages=self.chat_id_to_message_mapping[chat_id])
    
    def add_message(self, chat_id: str, req_message:Message) -> ChatBotResponse:
        message_id = self.chat_id_to_message_mapping[chat_id][-1].id + 1
        message = Message(id=message_id, 
                          content=req_message.content,
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
        self.chat_id_to_message_mapping[chat_id].append(message)
        return ChatBotResponse(chat=self.chat_id_to_chat_mapping[chat_id], 
                               messages=self.chat_id_to_message_mapping[chat_id])
    
    def edit_message(self, chat_id: str, req_message: Message) -> ChatBotResponse:
        for message in self.chat_id_to_message_mapping[chat_id]:
            if message.id == req_message.id:
                message.content = req_message.content
                message.updated_on = datetime.now()
                message.edited = True
        return ChatBotResponse(chat=self.chat_id_to_chat_mapping[chat_id], 
                               messages=self.chat_id_to_message_mapping[chat_id])
    
    def delete_message(self, chat_id: str, message_id: int) -> ChatBotResponse:
        for message in self.chat_id_to_message_mapping[chat_id]:
            if message.id == message_id:
                message.updated_on = datetime.now()
                message.deleted = True
        return ChatBotResponse(chat=self.chat_id_to_chat_mapping[chat_id], 
                               messages=self.chat_id_to_message_mapping[chat_id])