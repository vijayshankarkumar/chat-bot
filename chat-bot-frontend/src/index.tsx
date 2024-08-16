import * as React from "react";
import { render } from "react-dom";
import Chatbot from "./components/chatbot/ChatBot";

const App: React.FC = () => {
  return (
    <div className="App">
      <Chatbot />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);