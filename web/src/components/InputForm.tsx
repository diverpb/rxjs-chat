import React from "react";
import { textInput$, sendClick$, userName$ } from "../store/store";
import { useBehaviorSubjectState } from "./useBehaviorSubjectState";
import { Button } from "./Button";
import { Input } from "./Input";

export function InputForm() {
  const userName = useBehaviorSubjectState(userName$);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') sendClick$.next();
  }

  return (
    <div className="InputForm" onKeyDown={handleKeyPress}>
      <div className="InputForm__invitation">{userName ? `Hello, ${userName}, type some text: ` : "Hello, please enter your name: "}</div>
      <Input subject$={textInput$} className="InputForm__input" />
      <Button subject$={sendClick$} className="InputForm__button">Send</Button>
    </div>
  );
}
