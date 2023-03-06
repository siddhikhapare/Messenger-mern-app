const express = require("express");
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/error");
require('dotenv').config();
const path = require("path");

const app = express();

mongoose.connect(process.env.DATABASE)
.then(() => console.log("DB CONNECTED"))
.catch(error => console.log(`DB CONNECTION ERR ${error}`))

app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());

app.get('/',(req,res) => {  
   res.send("API is running")
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "/client/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port,console.log(`server is listening on port ${port}`));
const base_url = process.env.REACT_APP_API_URI

const io = require("socket.io")(server, {
  pingTimeout: 60000, 
  cors: {
      origin: base_url,
  },
});
 
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => { 
    socket.join(userData._id); 
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
 

socket.on("new message", (newMessageRecieved) => {
  var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
  });
});
 
   
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
