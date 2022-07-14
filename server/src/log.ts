import { Logger } from "@rxjs-chat/common";
import { tap } from "rxjs";

export const log = Logger.getLogger("SERVER", "Cyan", "rxjs-chat");
export const webLog = Logger.getLogger("WEB", "Yellow");
export const caryLog =
  (tag: string) =>
  <T>(e: T) =>
    log(tag, e);
export const tapLog = <T>(tag: string) => tap((e: T) => log(tag, e));
