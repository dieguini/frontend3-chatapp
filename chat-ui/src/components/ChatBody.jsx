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
      <div className="chat-history">
        <ul>
          {messages.map((message, index) => (
            <li className="clearfix">
              <div className="message-data align-right">
                <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name" >User: {message.userId === user_object_parse.userId ? "you" : message.userName}</span> <i class="fa fa-circle me"></i>
              </div>
              <div class="message other-message float-right">
                { message.message }
              </div>
              {/* <p key={`user_${index}`}>User: {message.userId === user_object_parse.userId ? "you" : message.userName}</p>
              <p key={`message_${index}`}>{ message.message }</p> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatBody;
