import { routerToken } from "./routes/token.js";
import { routerUser } from "./routes/user.js";
import { routerChat } from "./routes/chat.js";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HemiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/Tokens", routerToken);
app.use("/api/Users", routerUser);
app.use("/api/Chats", routerChat);

app.listen(8080);
