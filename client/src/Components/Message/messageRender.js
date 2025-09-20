import { UserContextProvider } from "./UserContext";
import ChatRoutes from "./Routes";

import React from "react";
function MessageRender() {
  return (
    <UserContextProvider>
      <ChatRoutes />
    </UserContextProvider>
  );
}

export default MessageRender;
