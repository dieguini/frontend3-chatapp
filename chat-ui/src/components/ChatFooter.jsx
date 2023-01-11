import React, { useCallback, useEffect, useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) =>
      console.log("message from server: ", data)
    );
  }, [message, socket]);

  const handleMessage = useCallback(
    (e) => {
      e.preventDefault();

      if (message.trim()) {
        socket.emit("message", {
          message: message,
          userName: localStorage.getItem("userName"),
          socketId: socket.id,
        });
        setMessage("");
      }
    },
    [message, socket]
  );

  return (
    <div>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
