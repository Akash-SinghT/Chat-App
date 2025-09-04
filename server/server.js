import express from "express";
import { fileURLToPath } from "url";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
// Needed because of ES modules (__dirname not available by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
