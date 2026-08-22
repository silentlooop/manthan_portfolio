import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root";



// Silence non-critical console output in production (hosted) builds
if (import.meta.env.PROD) {
  const noop = () => { };
  // Keep console.error so real errors are still visible
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
}

createRoot(document.getElementById("root")!).render(<Root />);
