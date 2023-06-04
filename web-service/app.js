import express from "express";
import bodyParser from "body-parser";

const server = express();

server.use(express.static("public"));
server.use(bodyParser());

server.listen(8080);
