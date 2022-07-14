import { Events } from "@rxjs-chat/common";
import React from "react";
import { map } from "rxjs";
import { groupContBy } from "../misc/utils";
import { messages$, userName$ } from "../store/store";
import { useBehaviorSubjectState } from "./useBehaviorSubjectState";
import { useObservableEffect } from "./useObservableEffect";
import { useObservableState } from "./useObservableState";

type MessageGroup = {
  user: string;
  messages: string[];
};

const mapToGroups = (messages: Events.Event<"Message">[]): MessageGroup[] =>
  messages.map((e) => ({
    user: e.payload.user,
    messages: [e.payload.text],
  }));

const groupEq = (a: MessageGroup, b: MessageGroup) => a.user === b.user;

const groupAdd = (a: MessageGroup, b: MessageGroup): MessageGroup => ({
  user: a.user,
  messages: [...a.messages, ...b.messages],
});

const groupContMessage = groupContBy(groupEq, groupAdd);

const groups$ = messages$.pipe(map(mapToGroups), map(groupContMessage));

export function MessageList() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const groups = useObservableState(groups$, []);

  useObservableEffect(groups$, () => {
    setTimeout(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  });

  const userName = useBehaviorSubjectState(userName$);

  return (
    <div className="MessageList ScrollSection" ref={scrollRef}>
      {groups.map((group, i) => (
        <div
          key={group.user + i}
          className={
            userName === group.user
              ? "MessageList__message MessageList__message--own"
              : "MessageList__message MessageList__message--other"
          }
        >
          <div>
            <b>{group.user}: </b>
          </div>
          {group.messages.map((text, i) => (
            <div key={text + i}>{text}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
