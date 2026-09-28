import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthsProvider from "./app/provider/AuthsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthsProvider>
      <App />
    </AuthsProvider>
    {/* Composition */}
  </StrictMode>,
);
