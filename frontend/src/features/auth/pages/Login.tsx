import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleLogin } = useAuth();
  
  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin({ email, password });
    nav('/home')
  };

  return (
    <main>
      <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background Blur */}
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

        {/* Login Card */}
        <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>

            <p className="text-gray-300 text-sm">
              Login to continue your journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition duration-300 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-200">
                  Password
                </label>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition duration-300 placeholder-gray-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition duration-300 font-semibold text-lg shadow-lg shadow-cyan-500/30"
            >
              {loading && (
                <span
                  className="inline-block mt-1 mr-1.5 w-4 h-4 border-2 border-white/20 border-t-white rounded-3xl animate-spin" 
                />
              )}
              Sign In
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-gray-300 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/register">
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Sign Up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
