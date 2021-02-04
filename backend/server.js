const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
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
    origin: "http://localhost:3000",
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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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
//   let currentPerson;
//   socket.on("username select", (person) => {
//     currentPerson = person;
//     personList.push(currentPerson);
//     io.emit("user connected", currentPerson);
//     io.emit("just connected", personList);
//   });
//   socket.on("private message", (msg, person, target) => {
//     io.emit("private message", msg, person, target);
//   });
//   socket.on("chat message", (msg, person) => {
//     io.emit("chat message", msg, person);
//   });
//   socket.on("user typing", (username) => {
//     io.emit("user typing", username);
//     usernameList.push(username);
//     setTimeout(() => {
//       let firstInstanceOfUser = usernameList.indexOf(username);
//       usernameList.splice(firstInstanceOfUser, 1);
//       if (!(usernameList.indexOf(username) == -1)) {
//         return;
//       }
//       io.emit("user not typing anymore", username);
//     }, 3000);
//   });
//   socket.on("disconnect", () => {
//     io.emit("user disconnected", currentPerson.username);
//     personIndex = personList.indexOf(currentPerson);
//     personList.splice(personIndex, 1);
//   });
// });

http.listen(port, () => {
  console.log(`listening on port *:${port}`);
});
