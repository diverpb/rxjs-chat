import { Events } from "@rxjs-chat/common";
import {
  take,
  map,
  combineLatest,
  merge,
  skipUntil,
  last,
  Observable,
  scan, 
  shareReplay, 
  EMPTY
} from "rxjs";

export function transformInputStream(wsInput$: Observable<Events.IEvent>): Observable<Events.IEvent> {
    const join$ = wsInput$.pipe(Events.filter("Join"), take(1));
  
    const message$ = wsInput$.pipe(skipUntil(join$), Events.filter("Message"));
  
    const leave$ = combineLatest([join$, wsInput$.pipe(last(null, null))]).pipe(
      map(([joinEvent]) =>
        Events.make("Leave", { user: joinEvent.payload.user })
      ),
      take(1)
    );
  
    return merge(join$, message$, leave$);
}

export function transformOutputStream(bus$: Observable<Events.IEvent>): Observable<Events.IEvent> {

    const messages$ = bus$.pipe(Events.filter("Message"), shareReplay(50));

    const joinAndLeave$ = merge(
        bus$.pipe(Events.filter("Join")),
        bus$.pipe(Events.filter("Leave"))
      );
    
    const isJoin = Events.isEventOfType("Join");
    
    const activeUsers$ = joinAndLeave$.pipe(
      scan((users, event) => {
        isJoin(event)
          ? users.add(event.payload.user)
          : users.delete(event.payload.user);
        return users;
      }, new Set<string>()),
      map((users) => Events.make("Users", { users: Array.from(users) })),
      shareReplay(1)
    );
    
    const ping$ = EMPTY; //interval(1000).pipe(map(() => Events.make("Ping", undefined)));
    
    return merge(messages$, joinAndLeave$, activeUsers$, ping$ );
}