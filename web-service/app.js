import { routerToken } from "./routes/token.js";
import { routerUser } from "./routes/users.js";

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


app.listen(8080);
