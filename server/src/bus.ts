import { Subject } from "rxjs";
import { Events } from "@rxjs-chat/common";
import { caryLog } from "./log";
import { transformOutputStream } from "./streamTransfomers";

export const bus$ = new Subject<Events.IEvent>();

bus$.subscribe(caryLog("bus"));

export const outgoing$ = transformOutputStream(bus$);

outgoing$.subscribe(caryLog("outgoing"));
