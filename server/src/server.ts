import express, { json } from "express";
import cors from "cors";
import { Config } from "@rxjs-chat/common";

const app = express();
if (Config.isDev) app.use(cors());
if (Config.isProd) app.use(express.static("../web/dist"));
app.use(json());

app.get(Config.api, (_, res) => {
  res.send({ message: "Hello express api!" });
});

app
  .listen(Config.port, () => console.log("Server is up and running"))
  .on("error", (e) => console.error("Server start error:", e));

console.log(Config.environment);
