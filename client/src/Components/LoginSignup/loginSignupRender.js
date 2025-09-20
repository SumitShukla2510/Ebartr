import { UserContextProvider } from "../Message/UserContext";
import LoginSignup from "./RegisterAndLoginForm";

import React from "react";
function MessageRender() {
  return (
    <UserContextProvider>
      <LoginSignup />
    </UserContextProvider>
  );
}

export default MessageRender;
