const express = require("express");
const app = express();
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen("5000", () => console.log("Server is running..."));

let userlist = [];
const devconf = {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, devconf);

io.on("connection", (socket) => {
  socket.username = "Инкогнито";

  socket.on("start", () => {
    const user = { username: socket.username, id: socket.id };
    userlist = [...userlist, user];
    io.sockets.emit("get_data", user);
    io.sockets.emit("get_user_list", userlist);

    io.sockets.emit("add_system_message", "Подключился : " + user.username);
  });

  socket.on("change_username", (data) => {
    userlist = userlist.map((item) => {
      if (item.id === socket.id) {
        item.username = data.username;
      }
      return item;
    });

    io.sockets.emit("get_user_list", userlist);
    io.sockets.emit(
      "add_system_message",
      socket.username + " сменил имя на " + data.username
    );
    socket.username = data.username;
  });

  socket.on("new_message", (data) => {
    io.sockets.emit("add_mess", {
      message: data.message,
      username: socket.username,
      id: socket.id,
    });

    if ((data.message === "Привет") & (socket.username === "Инкогнито")) {
      io.sockets.emit("add_mess", {
        message: "И тебе не хворать",
        username: "Бот",
      });
    }
  });

  socket.on("disconnect", () => {
    userlist = userlist.filter((user) => user.id !== socket.id);
    io.sockets.emit("add_system_message", socket.username + " покинул чат");
    io.sockets.emit("get_user_list", userlist);
  });
});
