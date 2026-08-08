import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import ProtectedWrapper from "./features/auth/pages/ProtectedWrapper";
import InterviewHome from "./features/ai/pages/InterviewHome";
import ShowReport from "./features/ai/pages/ShowReport";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .desktop-zoom .h-screen {
            height: calc(100vh / 0.85);
          }

          .desktop-zoom .min-h-screen {
            min-height: calc(100vh / 0.85);
          }
        }
      `}</style>
      <main className="desktop-zoom min-h-screen lg:[zoom:0.85]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          
          {/* All protected routes here */}
          <Route element={<ProtectedWrapper />}>
            <Route path="/home" element={<InterviewHome />} />
            <Route path="/report/:id" element={<ShowReport />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
