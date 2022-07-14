import express, { json } from "express";
import expressWs from "express-ws";
import cors from "cors";
import { Config, Events } from "@rxjs-chat/common";
import { bus$, outgoing$ } from "./bus";
import { playground } from "./playground";
import { WsSubject } from "./WsSubject";
import { transformInputStream } from "./streamTransfomers";
import { takeWhile } from "rxjs";
import { log, webLog } from './log'

const app = expressWs(express()).app;
if (Config.isDev) app.use(cors());
if (Config.isProd) app.use(express.static("../web/dist"));
app.use(json());

app.get(Config.api, (_, res) => {
  res.send({ message: "Hello express api!" });
});

app.post(Config.log, (req, res) => {
  const dataToLog = Array.isArray(req.body) ? req.body : [req.body];
  webLog(...dataToLog);
  res.status(200).send('"ok"');
});


app.ws(Config.ws, (ws, _) => {
  const ws$ = new WsSubject(ws, Events.parseEvent);

  transformInputStream(ws$).subscribe(e => bus$.next(e));

  outgoing$.pipe(takeWhile(ws$.isOpen)).subscribe((e) => ws$.next(e));
});

playground();

log('Server start --------------------');

app
  .listen(Config.port, () => {
    log("Server is up and running");
  })
  .on("error", (e) => log("Server start error:", e));
