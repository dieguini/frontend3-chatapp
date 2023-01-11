import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, socket }) => {
  const navigate = useNavigate();
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTyping(data);
    });
  }, [typing, socket]);

  /* useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
    console.log("this is the user response", users);
  }, [socket]); */

  const leaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const my_user = localStorage.getItem("userName");

  return (
    <>
      <header className="class-header">
        <p>Socket IO chat</p>
        <button onClick={leaveChat}>Leave Chat</button>
      </header>
      { typing.typing && typing.userName !== my_user ? <p>...</p> : ""} 
      <div>
        {messages.map((message) => (
          <>
            <p key={message}>User: {message.userName === my_user ? "you" : message.userName}</p>
            <p>{ message.message }</p>
          </>
        ))}
      </div>
    </>
  );
};

export default ChatBody;
