from fastapi import FastAPI
from app.routers import chatbot

app = FastAPI()

# Include routers
app.include_router(chatbot.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to chat bot api"}
