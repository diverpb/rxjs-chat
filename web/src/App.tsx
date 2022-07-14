import React, { useState, useEffect } from "react";
import { Config } from "@rxjs-chat/common";

export function App() {
  const [result, setResult] = useState("loading");

  useEffect(() => {
    fetch(Config.host + Config.api)
      .then((r) => r.json())
      .then(({ message }) => message)
      .then(setResult);
  }, []);

  return (
    <div>
      <div> Hello react! </div> 
      <div> environment: {Config.environment}</div> 
      <div> server answer: {result}</div>
    </div>
  );
}
