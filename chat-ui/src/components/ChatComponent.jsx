import React, { useEffect, useState } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatSideBar from "./ChatSideBar";

const ChatComponent = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", data => {
      setMessages([...messages, data])
    });
    // Dependencias que si no se agregan entonces useEffect no los toma en cuenta
  }, [messages, socket]);

  return (
    <div className="container clearfix">
      <ChatSideBar className="people-list" socket={socket} />
      <ChatBody className="chat" messages={messages} socket={socket} />
      <ChatFooter className="chat-message clearfix" socket={socket} />
      
      {/* <div className="chat-component-body">
        <ChatBody messages={messages} socket={socket} />
        <ChatFooter socket={socket} />
      </div> */}
    </div>
  );
};

export default ChatComponent;
