import React, { useState } from "react";
// import {  } from "@assets/";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function saveUserInfo(e: React.FormEvent) {
    e.preventDefault();
    setUserName("Rajat");
    setPassword("Rajat123");
  }

  return (
    <div>
      <form method="post" onSubmit={saveUserInfo}>
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <input type="text" value={userName} name="dUserName" id="dUserName" />
      <input type="text" value={password} name="dPassword" id="dPassword" />
    </div>
  );
};
