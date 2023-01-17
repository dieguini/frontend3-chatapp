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

  const my_user_object = localStorage.getItem("userObject");
  const user_object_parse = JSON.parse(my_user_object);

  const leaveChat = () => {
    localStorage.removeItem("userObject");
    socket.emit("removeUser", user_object_parse.userId);
    navigate("/");
    window.location.reload();
  };


  return (
    <>
      <header className="class-header">
        <p>Socket IO chat</p>
        <button onClick={leaveChat}>Leave Chat</button>
      </header>
      { typing.typing && typing.userId !== user_object_parse.userId ? <p>...</p> : ""} 
      <div>
        {messages.map((message) => (
          <>
            <p key={message.socketId}>User: {message.userId === user_object_parse.userId ? "you" : message.userName}</p>
            <p>{ message.message }</p>
          </>
        ))}
      </div>
    </>
  );
};

export default ChatBody;
