import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import ProtectedWrapper from "./features/auth/pages/ProtectedWrapper";
import InterviewHome from "./features/ai/pages/InterviewHome";
import ShowReport from "./features/ai/pages/ShowReport";
import NotFound from "./features/NotFound";

const App = () => {
  return (
    <main className="min-h-screen ">
      
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
  );
};

export default App;
