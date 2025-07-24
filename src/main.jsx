import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";

import "./styles/Index.css";

import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
