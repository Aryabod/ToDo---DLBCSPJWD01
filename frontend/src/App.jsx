import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaskPage from "./pages/TaskPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0e1624] text-white">
      <main className="flex-grow overflow-auto">
        {!user ? (
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
          <TaskPage user={user} onLogout={() => setUser(null)} />
        )}
      </main>
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-800">
        © Aryabod Nikpour 2025
      </footer>
    </div>
  );
}
