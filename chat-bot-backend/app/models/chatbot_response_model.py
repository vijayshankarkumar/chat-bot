from typing import List
from pydantic import BaseModel
from app.models.chat_model import Chat
from app.models.message_model import Message

class ChatBotResponse(BaseModel):
    chat: Chat
    messages: List[Message]