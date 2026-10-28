import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  // socket.broadcast.emit('chat_message', {
  //   usuario: 'INFO',
  //   mensaje: `Se ha conectado un nuevo usuario.`
  // });

  socket.on("led_status", (data) => {
    io.emit("led_status", data);
  });
});

server.listen(process.env.PORT || 3002);
