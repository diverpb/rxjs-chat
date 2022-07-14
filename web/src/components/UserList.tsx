import React from "react";
import { users$ } from "../store/store";
import { useBehaviorSubjectState } from "./useBehaviorSubjectState";

export function UserList() {
  const users = useBehaviorSubjectState(users$);

  return (
    <div className="UserList ScrollSection">
      <h2>Active users</h2>
      <hr />
      {users.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
}
