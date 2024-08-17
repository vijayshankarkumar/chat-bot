from pydantic import BaseModel, Field
from datetime import datetime

class Message(BaseModel): 
    id: int
    content: str
    type: int
    edited: bool
    deleted: bool
    created_on: datetime = Field(default_factory=datetime.now)
    updated_on: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True