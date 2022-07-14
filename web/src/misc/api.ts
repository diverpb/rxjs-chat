import { Config, Events } from "@rxjs-chat/common";
import { webSocket } from 'rxjs/webSocket'

export namespace Api {
  const httpUrl = "http://" + Config.host;

  export const get = (path: string) =>
    fetch(httpUrl + path).then((r) => r.json());

  export const post = (path: string, body: unknown) =>
    fetch(httpUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

  export const getWebSocket = () => webSocket<Events.IEvent>({
    url: 'ws://' + Config.host + Config.ws
  });

}
