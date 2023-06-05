const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routerToken = require("./routes/token.js");
const routerUser = require("./routes/user.js");
const routerChat = require("./routes/chat.js");

mongoose.connect("mongodb://127.0.0.1:27017/HemiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/Tokens", routerToken);
app.use("/api/Users", routerUser);
app.use("/api/Chats", routerChat);

app.listen(5000);
