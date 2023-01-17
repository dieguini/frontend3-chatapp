import React, { /* useEffect, */ useState } from "react";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userId: uuid(), userName: userName, socketID: socket.id };
    localStorage.setItem("userObject", JSON.stringify(user));
    socket.emit("newUser", user);
    navigate("/chat");
  };

  /* useEffect(() => {
    // Enviar mensaje al servidor
    socket.emit("helloFromClient", "Interesante");

    socket.on("helloFromServer", (...args) => {
      setMessage(args);
    });
  }, [socket]); */

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in to Chat</h2>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        id="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button>SingIn</button>
    </form>
  );
};

export default Home;
