
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const app = express();
const db = new Low(new JSONFile("db.json"));

app.use(cors());
app.use(bodyParser.json());

(async () => {
  await db.read();
  if (!db.data) {
    db.data = { users: [], tasks: [] };
    await db.write();
  }
})();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const exists = db.data.users.find((u) => u.username === username);
  if (!exists) {
    db.data.users.push({ username, password });
    await db.write();
  }
  res.json({ success: true });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, user: username });
  } else {
    res.json({ success: false });
  }
});

app.get("/tasks", (req, res) => {
  const { username } = req.query;
  const userTasks = db.data.tasks.filter((t) => t.username === username);
  res.json(userTasks);
});

app.post("/tasks", async (req, res) => {
  const { username, text } = req.body;
  db.data.tasks.push({ username, text });
  await db.write();
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
