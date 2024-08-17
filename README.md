
# chat-bot

A user-friendly chat widget enabling seamless interaction with a chatbot. The widget provides the following core functionalities:

- Send Messages: Users can send messages directly to the chatbot, which processes the input through the backend system and returns an appropriate response.

- Delete Messages: Users have the option to delete any message they’ve sent, removing it from the chat history.

- Edit Messages: Users can modify messages they’ve previously sent, allowing them to correct or update their input before the chatbot processes it further.

![Screenshot 2024-08-17 213527](https://github.com/user-attachments/assets/dd17d7e7-9802-4c02-b227-55b486d1c1b0)


### Documentation
**Project setup**
 - **Clone the Repository**:  ```git clone https://github.com/vijayshankarkumar/chat-bot.git```
 - This project is built with **ReactJS** using **TypeScript** for the frontend and **FastAPI** using **Python** for the backend.
 - The project structure includes both frontend and backend components within a single directory. The folder structure is as follows:
```
├ .git
├ chat-bot-frontend/         - frontend project
│    ├ src/                  - source files
│    ├ public/
|    └ package.json
└ chat-bot-backend/          - backend project
     ├ app/                  - source files
     └ tests/                - test files
```
 **Build the project**: 
 -  For building frontend, navigate to ```./chat-bot-frontend``` and run ```npm install``` and start the node server with ```npm start```
 - To build backend project, navigate to ```./chat-bot-backend``` and run ```pip  install  "fastapi[standard]"```  and run ```uvicorn app.main:app --reload``` to start the FastAPI web server
 - To view the backend API endpoint contracts by navigating to: `http://127.0.0.1:8000/docs#/default/edit_message_chatbot_delete_message__chat_id___message_id__post`.
 - To access the frontend open ```http://localhost:3000/```

#### Frontend
- The chat widget is structured with a parent component, **ChatBot**, which contains the **ChatList** and **Chat** child components.
- The **Axios** library is used for making API calls to the backend.

#### Backend
- Initiate Chat Api:  ```/chat-bot/initiate-chat``` for initiating chat with the chat, it returns ```chat-id``` for further api call.
- Add Message Api: ```/chat-bot/add-message``` for adding message to the given ```chat-id```. 
- Edit Message Api: ```/chat-bot/edit-message/{chat-id}/{message-id}``` for editing a message with the given ```chat-id``` and ```message-id``` along with the edited message content. 
- Delete Message Api: ```/chat-bot/delete-message/{chat-id}/{message-id}``` for deleting a message with the given ```chat-id ```and ```message-id```.

#### Usability
-   **Frontend Integration**:
    -   This project can be integrated into any existing ReactJS with TypeScript project. The **ChatBot** component can function as a standalone component when provided with valid props.
-   **Backend Extensibility**:
    -   The backend can be extended to handle specific use cases. It processes incoming messages for a given chat, with the remaining functionalities handled automatically.

