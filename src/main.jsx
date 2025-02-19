import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>
);
