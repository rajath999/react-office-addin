import React from "react";

export const Login = () => {
  return (
    <div>
      <input type="text" name="username" id="username" />
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </div>
  );
};
