import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

// StrictMode disabled in dev — re-enable once production prove-out is done.
createRoot(container).render(<App />);
