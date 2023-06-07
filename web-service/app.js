const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app); 
const { Server } = require("socket.io");
const io = new Server(5555, server);

const cors = require("cors");
const mongoose = require("mongoose");

const routerToken = require("./routes/token.js");
const routerUser = require("./routes/user.js");
const routerChat = require("./routes/chat.js");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/HemiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

io.on('connection', function(socket) {

    socket.on('msg', function(msg) {
        io.emit(msg.reciverUserName, msg);
    });
});

app.use("/api/Tokens", routerToken);
app.use("/api/Users", routerUser);
app.use("/api/Chats", routerChat);

app.listen(5000)