import express from "express";
import bodyParser from "body-parser";
import scheduleEmail from "./middlewares/EmailMiddleware";
import setRoutes from "./routes";

const server = express();

server.use(bodyParser.json());
server.use(`/email/create`, scheduleEmail);

setRoutes(server);

export default server;