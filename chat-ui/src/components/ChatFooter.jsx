import React, { useCallback, useEffect, useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState([]);
  const [typing, setTyping] = useState("");

  /* useEffect(() => {
    socket.on("messageResponse", (data) =>
      console.log("message from server: ", data)
    );
  }, [message, socket]); */

  useEffect(() => {
    socket.on("typing", (data) => setTyping(data));
  }, [socket]);

  const my_user_object = localStorage.getItem("userObject");
  const user_object_parse = JSON.parse(my_user_object);

  const handleMessage = useCallback(
    (e) => {
      e.preventDefault();

      if (message.trim()) {
        socket.emit("message", {
          message: message,
          userName: user_object_parse.userName,
          userId: user_object_parse.userId,
          socketId: socket.id,
        });
        setMessage("");
      }
    },
    [message, socket]
  );

  const handleInputChange = (e) => {
    let inputText = e.target.value;
    setMessage(inputText);
  };

  const handleKeyUp = (e) => {
    socket.emit("typing", {typing: false, userId: user_object_parse.userId});
  };
  const handleKeyDown = (e) => {
    socket.emit("typing", {typing: true, userId: user_object_parse.userId});
  };

  return (
    <div>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Write a message"
          value={message}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        ></input>
        <button>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
