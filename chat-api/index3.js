const express = require('express')
const app = express();

const PORT = 1111; // Puerto de conexion

const http = require('http').Server(app); // Para configuracion restrictiva de http
const cors = require('cors');

const socketCallback = require('socket.io'); // Funcion que retorna datos de configuracion
// Espera server=http y json con cors = define end points
const socketIO = socketCallback(http, {
  cors: { // Lo mejor es configurar el cors y URLs
    origins: ['http://localhost:3000']
  }
});

app.use(cors());

let users = [];

app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Hello World from API"
  });
});

// Espera evento=connection y funcion
socketIO.on('connection', (socket) => {
  console.log(" socket start with socket ID: ", socket.id);

  // Envio al cliente
  // socket.emit("helloFromServer", 1, "String", {"value":3})
  // socket.emit("helloFromServer", "Great");
  
  // Handler
  socket.on("message", data => {
    console.log("this is a message from client: ", data);
    socketIO.emit("messageResponse", data);
  });

  // Typing
  socket.on("typing", data => {
    console.log("typing client: ", data);
    socketIO.emit("typingResponse", data);
  });

  // Users Handler
  socket.on("newUser", data => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  // Users Handler
  socket.on("removeUser", userId => {
    users.splice(
      users.findIndex(e => e.userId === userId),
      1
    );
    socketIO.emit("newUserResponse", users);
  });

  // Recibiendo mensaje del cliente
  socket.on("helloFromClient", (...args) => {
    console.log("arguments: ", args);

    socket.emit("helloFromServer", args);
  });

  socket.on('disconnect', () => {
    console.log("the user is been disconnected!");
  });
});

// Menos restrictivo
/* app.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT PORT: ", PORT);
}); */
// Mas restrictivo con http
http.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT PORT: ", PORT);
});

