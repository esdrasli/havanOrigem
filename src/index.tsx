import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hooks from "./hooks";

ReactDOM.render(
  <React.StrictMode>
    <Hooks>
      <App />
    </Hooks>
  </React.StrictMode>,
  document.getElementById("root")
);
