import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import { InterviewProvider } from "./context/interview.context.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <InterviewProvider>
        <App />
      </InterviewProvider>
    </AuthProvider>
  </BrowserRouter>,
);
