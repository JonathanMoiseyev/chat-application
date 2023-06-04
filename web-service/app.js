import express from "express";
import bodyParser from "body-parser";
import { routerToken } from "./routes/token.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser());

app.use("/Tokens", routerToken);


app.listen(8080);
