import { filter as rxfilter } from "rxjs";

export namespace Events {
  type EventTypeMap = {
    Message: { user: string; text: string };
    Join: { user: string };
    Leave: { user: string };
    Users: { users: string[] };
    Ping: undefined;
  };

  export type IEventType = keyof EventTypeMap;

  export interface IEvent {
    _type: IEventType;
    payload: EventTypeMap[IEventType];
  }

  export interface Event<T extends IEventType> extends IEvent {
    _type: T;
    payload: EventTypeMap[T];
  }

  export const isEvent = (e: any): e is IEvent =>
    typeof e === "object" &&
    e !== null &&
    "_type" in e &&
    typeof e._type === "string";

  export const isEventOfType =
    <T extends IEventType>(_type: T) =>
    (e: IEvent): e is Event<T> =>
      e._type === _type;

  export const filter = <T extends IEventType>(_type: T) =>
    rxfilter(isEventOfType(_type));

  export const make = <T extends IEventType>(
    type: T,
    payload: EventTypeMap[T]
  ): Event<T> => ({
    _type: type,
    payload,
  });

  export const parseEvent = (input: string | { data: { toString(): string } }): IEvent | Error => {
    try {
      const stringInput =
        typeof input === "string" ? input : input.data.toString();
      const data = JSON.parse(stringInput);
      return isEvent(data)
        ? data
        : new Error("Cannot parse event. Wrong input: " + input);
    } catch (e: unknown) {
      return e instanceof Error ? e : new Error(String(e));
    }
  };
}
