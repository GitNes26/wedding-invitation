import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WeddingInvitation from "./WeddingInvitation.jsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <GlobalContextProvider>
         <App />
      </GlobalContextProvider>
   </StrictMode>,
);
