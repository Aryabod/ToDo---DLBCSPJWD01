import React, { useState } from "react";

export default function LoginPage({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login process
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      onLogin(data); 
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white px-4"> {/* ToDo and logo */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">📝</div>
        <h1 className="text-3xl font-bold">ToDo</h1>
        <p className="text-sm text-gray-400">All of your tasks in one App!</p>
      </div>

      <div className="bg-[#1b2738] text-white rounded-2xl shadow-xl px-6 py-6 w-full max-w-sm sm:max-w-md md:max-w-lg"> {/* Login in form */}
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {/* Input fields for Email and Password */}
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Displays error messages */}
        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center text-sm mt-4">  {/* Switch to the signup page */}
          Don’t have an account?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-blue-500 cursor-pointer underline"
          >
            Sign up!
          </span>
        </p>
      </div>
    </div>
  );
}
