import { Subject } from "rxjs";
import { WebSocket } from "ws";

const defaultParser = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return e as Error;
  }
};

export class WsSubject<T> extends Subject<T> {
  constructor(
    private ws: WebSocket,
    private parser: (s: string) => T | Error = defaultParser,
    private serialize: (e: T) => string = JSON.stringify
  ) {
    super();

    ws.addEventListener('close', () => {
        super.complete();
        super.unsubscribe();
    });
    ws.addEventListener('error', (e) => super.error(e))

    ws.addEventListener('message', e => {
        const message = this.parser(e.data.toString());
        if (message instanceof Error) {
            super.error(e);
            ws.terminate();
        } else {
            super.next(message);
        }

    });
  }

  public isOpen = () => {
    return this.ws.readyState === WebSocket.OPEN && !this.isStopped;
  }

  override next(value: T): void {
    const { ws } = this;
    if (!this.isOpen()) return;
    ws.send(this.serialize(value));
  }
}
