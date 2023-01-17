import React, { useEffect, useState } from "react";

const ChatSideBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
    console.log("this is the user response", users);
  }, [socket]);

  return <>
      {/* <h1>
        Chat Users SideBar
      </h1> */}
      <div className="search">
        <input type="text" placeholder="search" />
      </div>
      <ul className="list">
        {
          users.map((user) => (
            <li className="clearfix" key={user.socketID}>
              <div className="about">
                <div className="name">
                  {user.userName}
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </>;
};

export default ChatSideBar;
