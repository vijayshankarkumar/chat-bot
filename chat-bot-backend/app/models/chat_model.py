from pydantic import BaseModel, Field
from datetime import datetime

class Chat(BaseModel):
    chat_id: str
    user_id: int
    created_on: datetime = Field(default_factory=datetime.now)
    updated_on: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True
