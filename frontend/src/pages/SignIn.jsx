import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with their full name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DBEFF9] to-[#F2F8FD] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl p-8 shadow-lg -mt-32">
        <h2 className="text-3xl font-semibold text-[#2C6F85] mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2C6F85] mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[#2C6F85] mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[#2C6F85] mb-2">Email</label>
        <input
          type="email"
          value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
          required
        />
          </div>
          <div>
            <label className="block text-[#2C6F85] mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
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
            className="w-full bg-[#2C6F85] text-white py-3 rounded-xl hover:bg-[#1a4d5f] transition-colors font-medium"
          disabled={loading}
        >
          {loading && (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          )}
          Sign Up
        </button>
        </form>
        <p className="mt-4 text-center text-[#2C6F85]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2C6F85] hover:text-[#1a4d5f] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;