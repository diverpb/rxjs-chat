import React from "react";
import { MessageList } from "./components/MessageList";
import { UserList } from "./components/UserList";
import { InputForm } from "./components/InputForm";
import './App.css';

export function App() {
  return (
    <div className="App">
      <div className="App__messages">
        <MessageList/>
      </div>
      <div className="App__users">
        <UserList />
      </div>
      <div className="App__input-form">
        <InputForm />
      </div>
    </div>
  );
}
