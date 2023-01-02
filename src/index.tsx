import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./Modules";
const rootElement  = document.getElementById("root");
if(rootElement){
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
