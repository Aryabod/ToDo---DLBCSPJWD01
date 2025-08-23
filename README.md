# ToDo App

![ToDo App](https://github.com/Aryabod/ToDo---DLBCSPJWD01/blob/main/screenshots/ToDo%20Tasks.png)


This is a simple ToDo list web application created for the **IU Project - Java and Web Development (DLBCSPJWD01)** course.

## ✅ Features

- User Sign Up & Login 
- Add, Edit, Delete tasks
- Mark tasks as complete/incomplete
- Filter to show/hide completed tasks
- Responsive UI (mobile/tablet/desktop)

## 🧰 Tech Stack

- **Frontend**: React.js + Tailwind CSS 
- **Backend**: Express.js + Node.js
- **Database**: JSON Database

## 📦 Installation & Setup

### Prerequisites

- Node.js installed
- Git installed

### Steps

```bash
# Clone the repository
git clone https://github.com/Aryabod/ToDo---DLBCSPJWD01
cd ToDo---DLBCSPJWD01

# Install dependencies
npm install

# Start the backend server
cd backend
node server.mjs


# Start the frontend (in a separate terminal)
cd frontend
npm run dev


# Backend runs at: http://localhost:3000
# Frontend runs at: http://localhost:5173

bash`

## ✅ Test Cases

### **User Authentication**

**Test Case 1: User can sign up with valid credentials**
1. Navigate to the sign-up page.
2. Enter a valid name, email, and password.
3. Click the "Sign Up" button.
**Expected:** User account is created, redirected to the login page.

**Test Case 2: User cannot sign up with an existing email**
1. Navigate to the sign-up page.
2. Enter an already registered email and a password.
3. Click the "Sign Up" button.
**Expected:** Error message shown — "Email already registered".

**Test Case 3: User can log in with valid credentials**
1. Navigate to the login page.
2. Enter a valid email and password.
3. Click the "Login" button.
**Expected:** User is authenticated and redirected to the dashboard.

**Test Case 4: User cannot log in with invalid credentials**
1. Navigate to the login page.
2. Enter invalid email or a wrong password.
3. Click the "Login" button.
**Expected:** Error message shown — "Invalid credentials".

**Test Case 5: User cannot access dashboard without logging in**
1. Log out.
2. Manually enter `/dashboard` in the browser.
**Expected:** Redirected to the login page.

**Test Case 6: User can log out**
1. Log in.
2. Click the "Logout" button.
**Expected:** Session ends, redirected to the login page.

---

### **Task Management**

**Test Case 1: User can add a task**
1. Enter a task title into the input field.
2. Click the "Add Task" button.
**Expected:** Task appears in the task list.

**Test Case 2: User cannot add an empty task**
1. Leave the input field empty.
2. Click the "Add Task" button.
**Expected:** No task is created.

**Test Case 3: User can mark a task as completed**
1. Click the checkbox next to a task.
**Expected:** Task is marked complete and text appears with a strikethrough.

**Test Case 4: User can edit a task**
1. Click the "Edit" button next to a task.
2. Change the task text.
3. Click "Save".
**Expected:** Task text updates in the list.

**Test Case 5: User can delete a task**
1. Click the "Delete" button next to a task.
**Expected:** Task is removed from the list.

**Test Case 6: User can hide completed tasks**
1. Uncheck the "Show Completed Tasks" checkbox.
**Expected:** Completed tasks are hidden from the list.

**Test Case 7: Task persistence after logout**
1. Add a task.
2. Log out.
3. Log back in.
**Expected:** Task still appears in the list.

**Test Case 8: Each user sees only their own tasks**
1. Log in as Aryabod and create tasks.
2. Log out and log in as Andy.
**Expected:** Andy only sees his own tasks, not Aryabod's.
