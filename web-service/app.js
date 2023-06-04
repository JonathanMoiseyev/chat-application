import { routerTokens } from "./routes/tokens.js";

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

app.use("/api/Tokens", routerTokens);

app.listen(8080);
