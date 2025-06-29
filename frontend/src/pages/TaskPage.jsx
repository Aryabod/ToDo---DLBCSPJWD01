// src/pages/TaskPage.jsx
import React, { useState } from "react";

export default function TaskPage({ user, onLogout }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(user.tasks || []);
  const [showCompleted, setShowCompleted] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;
    setTasks((all) => [
      ...all,
      { id: Date.now(), text: task.trim(), completed: false },
    ]);
    setTask("");
  };

  const toggleComplete = (id) =>
    setTasks((all) =>
      all.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const handleDelete = (id) =>
    setTasks((all) => all.filter((t) => t.id !== id));

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditText(t.text);
  };

  const saveEdit = () => {
    setTasks((all) =>
      all.map((t) => (t.id === editingId ? { ...t, text: editText } : t))
    );
    setEditingId(null);
    setEditText("");
  };

  const visible = showCompleted ? tasks : tasks.filter((t) => !t.completed);

  return (
    <div className="flex flex-col min-h-screen bg-[#0e1624] text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-2">📝 ToDo</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full max-w-2xl mx-auto px-6 py-8 space-y-8">
        <h2 className="text-xl text-center">Hi {user.name}!</h2>

        {/* ADD TASK BOX */}
        <div className="bg-[#1b2738] p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <input
            type="text"
            placeholder="What do you need to do?"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-bold"
          >
            Add Task
          </button>
        </div>

        {/* TOGGLE COMPLETED */}
        <div className="flex justify-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted((b) => !b)}
              className="h-5 w-5"
            />
            Show Completed Tasks
          </label>
        </div>

        {/* TASK LIST */}
        <div className="bg-[#1b2738] p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-lg font-semibold">
            My Tasks ({visible.length})
          </h3>

          {!visible.length ? (
            <p className="text-center text-gray-400 py-6">No tasks yet!</p>
          ) : (
            visible.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(t.id)}
                    className="h-5 w-5 flex-shrink-0"
                  />

                  {editingId === t.id ? (
                    <input
                      type="text"
                      className="
                        flex-1 min-w-0 max-w-[60%]     /* <-- cap width */
                        p-1 bg-gray-700 rounded text-white border border-gray-600
                        focus:outline-none
                      "
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    <span
                      className={`flex-1 min-w-0 ${
                        t.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {t.text}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {editingId === t.id ? (
                    <button
                      onClick={saveEdit}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(t)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
