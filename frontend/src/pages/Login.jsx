import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Go to landing page
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DBEFF9] to-[#F2F8FD] flex items-center justify-center p-4">
      <div className="w-full max-w-md -mt-32">
        <div className="bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-[#2C6F85] mb-6 text-center">Login</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label className="flex items-center mt-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 rounded border-[#AACBDA] text-[#2C6F85] focus:ring-[#2C6F85]"
                />
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2C6F85] text-white py-3 rounded-xl hover:bg-[#1a4d5f] transition-colors flex items-center justify-center font-medium"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              )}
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2C6F85] hover:text-[#1a4d5f] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}