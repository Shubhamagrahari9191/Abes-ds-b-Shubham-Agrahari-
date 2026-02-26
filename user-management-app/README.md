# 👥 User Management App
A simple React app — No backend, No MongoDB, No Axios needed.

---

## 📁 Project Structure
```
user-management-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── UserManagement.jsx
├── package.json
└── README.md
```

---

## ✅ Requirements
Only ONE thing needed:
- **Node.js** → Download from https://nodejs.org (choose LTS version)

To check if Node.js is already installed, open terminal and type:
```
node -v
```
If you see a version number (e.g. v18.0.0), you're good to go!

---

## 🚀 How to Run — Step by Step

### Step 1 — Open Terminal / Command Prompt
- **Windows**: Press `Win + R` → type `cmd` → press Enter
- **Mac**: Press `Cmd + Space` → type `terminal` → press Enter

### Step 2 — Go into the project folder
```bash
cd user-management-app
```
(Make sure you are inside the folder where package.json is)

### Step 3 — Install dependencies
```bash
npm install
```
⏳ This will take 1-2 minutes. Wait for it to finish.

### Step 4 — Start the app
```bash
npm start
```

### Step 5 — View in browser
It will automatically open → **http://localhost:3000**

If it doesn't open automatically, open your browser and go to:
```
http://localhost:3000
```

---

## 🛑 How to Stop the App
Press `Ctrl + C` in the terminal.

---

## ⚠️ Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `npm not found` | Install Node.js from https://nodejs.org |
| `npm install` fails | Delete `node_modules` folder and run `npm install` again |
| Port 3000 already in use | Type `Y` when asked to use another port |

---

## 🎯 Features
- ➕ Add new users
- ✏️ Edit existing users
- 🗑️ Delete users (with confirmation)
- 👁️ View user details (read-only)
- 🔍 Search by ID or Employee Code
- 💬 Toast notifications for all actions