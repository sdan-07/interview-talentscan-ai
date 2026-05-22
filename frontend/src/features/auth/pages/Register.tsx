import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    nav("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Glow */}
      {/* <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl top-10 left-10"></div> */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>

          <p className="text-gray-300 text-sm">
            Join us and start your journey today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your full name"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 placeholder-gray-400"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 transition duration-300 font-semibold text-lg shadow-lg shadow-pink-500/30"
          >
            {loading && (
              <span className="inline-block mt-1 mr-1.5 w-4 h-4 border-2 border-white/20 border-t-white rounded-3xl animate-spin" />
            )}
            Create Account
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-300 text-sm mt-8">
          Already have an account?{" "}
          <Link to="/">
            <a
              href="#"
              className="text-pink-400 hover:text-pink-300 font-medium"
            >
              Sign In
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
