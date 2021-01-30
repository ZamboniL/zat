const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
const groupRouter = require("./routes/group");
const messageRouter = require("./routes/message");

app.use("/api/auth", authRouter);
app.use("/api/group", groupRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

// let interval;

// io.on("connection", (socket) => {
//   const greetings = "hi user";
//   console.log(greetings);
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => {
//     let number = Math.random() * (1000 - 1) + 1;
//     socket.emit("new number", number);
//   }, 1000);
// });

// let usernameList = [];
// let personList = [];
// io.on("connection", (socket) => {
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
