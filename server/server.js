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

// ✅ Serve frontend from ./server/Public
app.use(express.static(path.join(__dirname, "server", "Public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "server", "Public", "index.html"));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is listening at port 3000`);
});
