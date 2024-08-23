from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.service.chatbot_service import ChatBotService
from app.models.chatbot_response_model import ChatBotResponse
from app.models.chatbot_request_model import ChatBotRequest

router = APIRouter()
chatbot_service = ChatBotService()

@router.get("/chatbot/initiate-chat", response_model=ChatBotResponse)
def initiate_chat():
    return chatbot_service.initiate_chat()


@router.post("/chatbot/add-message/{chat_id}", response_model=ChatBotResponse)
def add_message(chat_id: str, message: ChatBotRequest):
    return chatbot_service.add_message(chat_id, message)


@router.post("/chatbot/edit-message/{chat_id}/{message_id}", response_model=ChatBotResponse)
def edit_message(chat_id: str, message_id: int, message: ChatBotRequest):
    return chatbot_service.edit_message(chat_id, message_id, message)


@router.post("/chatbot/delete-message/{chat_id}/{message_id}", response_model=ChatBotResponse)
def edit_message(chat_id: str, message_id: int):
    return chatbot_service.delete_message(chat_id, message_id)

