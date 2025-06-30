import React, { useState } from "react";

export default function SignUpPage({ onSignup, onSwitchToLogin }) {
  // Stores al user input: name, email, password, and any error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle the sign-up process.
  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      onSignup(data); 
    } catch (err) {
      console.error("Signup error:", err);
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

      <div className="bg-[#1b2738] text-white rounded-2xl shadow-xl px-6 py-6 w-full max-w-sm sm:max-w-md md:max-w-lg"> {/* Signup form */}
        <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2> 
        {/* Input fields for Name, Email, Password */}
        <input 
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error messages */}
        {/* Sign-Up button */}
        <button 
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-4">  {/* Switch to the login page */}
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            className="text-blue-500 cursor-pointer underline"
          >
            Log in!
          </span>
        </p>
      </div>
    </div>
  );
}
