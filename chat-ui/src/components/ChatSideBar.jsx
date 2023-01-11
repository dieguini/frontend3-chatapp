import React, { useEffect, useState } from "react";

const ChatSideBar = ({ socket }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
    console.log("this is the user response", users);
  }, [socket]);

  return <>
      <h1>
        Chat Users SideBar
      </h1>
      <div>
        {users.map((user) => ( 
          <p key={user.socketID}>{user.userName}</p>
          ))}
      </div>
    </>;
};

export default ChatSideBar;
