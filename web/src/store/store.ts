import { Api } from "../misc/api";
import {
  Subject,
  map,
  filter,
  share,
  retry,
  BehaviorSubject,
  scan,
} from "rxjs";
import { Events } from "@rxjs-chat/common";

const notNull = <T>(e: T): e is Exclude<T, null> => !!e;

const ws$ = Api.getWebSocket();

const incoming$ = ws$.pipe(retry({ delay: 2000 }), share());

incoming$.subscribe(console.log);

export const messages$ = new BehaviorSubject<Events.Event<"Message">[]>([]);

export const users$ = new BehaviorSubject<string[]>([]);

export const userName$ = new BehaviorSubject<string>("");

export const textInput$ = new BehaviorSubject<string>("");

export const sendClick$ = new Subject<void>();

incoming$
  .pipe(
    Events.filter("Message"),
    scan((acc: Events.Event<"Message">[], m) => [...acc, m], [])
  )
  .subscribe(messages$);

incoming$
  .pipe(
    Events.filter("Users"),
    map((e) => e.payload.users)
  )
  .subscribe(users$);

const submit$ = sendClick$.pipe(
  map(() => [textInput$.getValue(), userName$.getValue(), users$.getValue()] as const),
  filter(([text]) => !!text),
  map(([text, user, users]) => {
    if (user) return Events.make("Message", { user, text });
    if (!user && !users.includes(text)) {
      return Events.make("Join", { user: text });
    }
    return null;
  }),
  filter(notNull),
);

submit$.subscribe((event) => {
  if (event._type === 'Join') userName$.next(event.payload.user);
  textInput$.next("");
  ws$.next(event);
});
