const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    withCredentials: true,
  },
});

const port = process.env.PORT || 4000;

// Middleware

// mongodb connect
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection was succesful");
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const groupRouter = require("./routes/group");
const messageRouter = require("./routes/message");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use("/api/message", messageRouter);

app.use(express.static(__dirname + "/public"));

// let usernameList = [];
// let personList = [];
io.sockets.on("connection", (socket) => {
  var currentRoom;
  var currentUser;

  socket.on("user_tag", (tag) => {
    currentUser = tag;
    socket.join(currentUser);
  });
  socket.on("in group", (tag) => {
    currentRoom = tag;
    socket.join(currentRoom);
  });
  socket.on("new message", (message) => {
    io.to(currentRoom).emit("get new messages", message);
  });
  socket.on("new user added", (user, group) => {
    io.to(currentRoom).emit("get new user", user);
    io.to(user.tag).emit("get new group", group);
  });
  socket.on("new group created", (group) => {
    io.to(currentUser).emit("get new group", group);
  });
  socket.on("new friend added", (friend) => {
    io.to(currentUser).emit("get new friend", friend);
  });
});

http.listen(port, () => {
  console.log(`listening on port *:${port}`);
});
