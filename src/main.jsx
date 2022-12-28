import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SubScriptionProvider from "./stores/subscription";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SubScriptionProvider>
      <App />
    </SubScriptionProvider>
  </React.StrictMode>
);
