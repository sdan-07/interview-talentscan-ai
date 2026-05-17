import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./Home/Home";
import ProtectedWrapper from "./features/auth/pages/ProtectedWrapper";

const App = () => {
  return (
    <main className="min-h-screen ">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* All protected routes here */}
          <Route element={<ProtectedWrapper />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      
    </main>
  );
};

export default App;
