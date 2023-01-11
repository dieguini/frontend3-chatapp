const express = require('express')
const app = express();

const PORT = 8080; // Puerto de conexion

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

app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Hello World from API"
  });
});

// Espera evento=connection y funcion
socketIO.on('connection', (socket) => {
  console.log(" socket start with socket ID: ", socket.id);
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

