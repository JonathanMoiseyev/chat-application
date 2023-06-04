import express from "express";
import bodyParser from "body-parser";
import { routerTokens } from "./routes/tokens.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser());

app.use("/api/Tokens", routerTokens);

app.listen(8080);