import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const adapter = new JSONFile("./db.json");
const db = new Low(adapter, { users: [] }); 
await db.read();

if (!db.data.users) {
  db.data.users = [];
  await db.write();
}

// Signup 
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const existing = db.data.users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "Account already exists" });
  }

  const newUser = { id: Date.now(), name, email, password, tasks: [] };
  db.data.users.push(newUser);
  await db.write();

  res.json(newUser);
});

// Login 
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.data.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json(user);
});

// Tasks 
app.post("/api/tasks", async (req, res) => {
  const { userId, tasks } = req.body;

  const user = db.data.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.tasks = tasks;
  await db.write();
  res.json({ success: true });
});

// Start server Message
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
