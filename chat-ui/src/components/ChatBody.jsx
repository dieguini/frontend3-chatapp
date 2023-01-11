import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages }) => {
  const navigate = useNavigate();

  const leaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="class-header">
        <p>Socket IO chat</p>
        <button onClick={leaveChat}>Leave Chat</button>
      </header>
      <div>
        {messages.map((message) => (
          <>
            <p>Id: {message.socketId}</p>
            <p>{message.message}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default ChatBody;
