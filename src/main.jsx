import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ Voeg dit toe
import "./index.css"; // of ./main.css afhankelijk van je project

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Router context toevoegen */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
