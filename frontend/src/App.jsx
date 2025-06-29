// src/App.jsx
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaskPage from "./pages/TaskPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0e1624] text-white">
      {/* MAIN AREA: scrolls if content is tall */}
      <main className="flex-grow overflow-auto">
        {!user ? (
          // Center only the login/signup card
          <div className="flex items-center justify-center h-full px-4">
            <div className="w-full max-w-md">
              {showSignup ? (
                <SignUpPage
                  onSignup={setUser}
                  onSwitchToLogin={() => setShowSignup(false)}
                />
              ) : (
                <LoginPage
                  onLogin={setUser}
                  onSwitchToSignup={() => setShowSignup(true)}
                />
              )}
            </div>
          </div>
        ) : (
          // TaskPage handles its own paddings/width, and will scroll if long
          <TaskPage user={user} onLogout={() => setUser(null)} />
        )}
      </main>

      {/* FOOTER: always visible at bottom, no extra scroll when short */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-800">
        © Aryabod Nikpour 2025
      </footer>
    </div>
  );
}
