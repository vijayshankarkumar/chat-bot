from typing import List, Dict
import uuid
from fastapi import HTTPException
from datetime import datetime
from app.models.chat_model import Chat
from app.models.message_model import Message
from app.models.chatbot_request_model import ChatBotRequest
from app.models.chatbot_response_model import ChatBotResponse


class ChatBotService:
    def __init__(self) -> None:
        self.chat_id_to_chat_mapping: Dict[str, Chat] = {}
        self.chat_id_to_message_mapping: Dict[str, List[Message]] = {}


    def initiate_chat(self) -> Chat:
        chat_id = str(uuid.uuid4())
        message = Message(id=1, 
                          content="Hi Jane, Amazing how Mosey is simplifying state compliance for buiness across the world!",
                          type=0,
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
    

    def add_message(self, chat_id: str, req_message:ChatBotRequest) -> ChatBotResponse:
        message_id = self.chat_id_to_message_mapping[chat_id][-1].id + 1
        message = Message(id=message_id, 
                          content=req_message.content,
                          type=req_message.type,
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
        self.chat_id_to_message_mapping[chat_id].append(message)
        return self.process_messages(chat_id=chat_id)
    

    def edit_message(self, chat_id: str, message_id, req_message: ChatBotRequest) -> ChatBotResponse:
        for message in self.chat_id_to_message_mapping[chat_id]:
            if message.id == message_id:
                message.content = req_message.content
                message.updated_on = datetime.now()
                message.edited = True
        return self.process_messages(chat_id=chat_id)
    

    def delete_message(self, chat_id: str, message_id: int) -> ChatBotResponse:
        for message in self.chat_id_to_message_mapping[chat_id]:
            if message.id == message_id:
                message.updated_on = datetime.now()
                message.deleted = True
        return self.process_messages(chat_id=chat_id)


    def process_messages(self, chat_id: str) -> ChatBotResponse:
        messages = [msg for msg in self.chat_id_to_message_mapping[chat_id] if not msg.deleted]
        if messages[-1].type == 1:
            if messages[-1].content == 'Call Lead':
                message = Message(id=messages[-1].id + 1, 
                          content='Okay, you can call +12-1234-2345 to talk to our sales lead',
                          type=0,
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
                self.chat_id_to_message_mapping[chat_id].append(message)
            elif messages[-1].content == 'Create This Month Report':
                message = Message(id=messages[-1].id + 1, 
                          content='Okay, we will create this report and send you over email',
                          type=0,
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
                self.chat_id_to_message_mapping[chat_id].append(message)
            elif messages[-1].content == 'Random Message':
                raise HTTPException(status_code=500, detail="This message can't be processed")
            else:
                message = Message(id=messages[-1].id + 1, 
                          content='Hey, how can you i help you? You can choose an option to proceed.',
                          type=0,
                          edited=False,
                          deleted=False,
                          created_on=datetime.now(),
                          updated_on=datetime.now())
                self.chat_id_to_message_mapping[chat_id].append(message)
        return ChatBotResponse(chat=self.chat_id_to_chat_mapping[chat_id], 
                               messages=self.chat_id_to_message_mapping[chat_id])
    
