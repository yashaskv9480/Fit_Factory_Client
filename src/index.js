import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Context from "./Context/Context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { UserProvider } from "./UserContext/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Context>
        <App />
      </Context>
    </UserProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
