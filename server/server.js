import express from "express";
const app = express();
import http from "http";
import path from "path";

import { Server } from "socket.io";
const __dirname = path.resolve();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server); // io - input/ output  will handle socket or all my connextions
// Handle Socket Connection
io.on("connection", (socket) => {
  // Runs every time a new client connects to the server.
  // scoket -> socket represents that unique client connection.
  console.log("new user has connected", socket.id); // everu socket has id managed autoatically
  socket.on("usermessage", (message) => {
    //,.on listen the event like i am listening give me the data
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    //Runs when a client closes the browser tab / loses connection.
    console.log("Secket Disconnected", socket.id);
  });
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "Public")));
// other request will handle by this
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

server.listen(3000, () => {
  console.log(`server is listening at port 3000`);
});
