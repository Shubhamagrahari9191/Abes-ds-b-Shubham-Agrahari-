# 👥 User Management — Full Stack
**React + Node.js + Express + MongoDB + Axios**

---

## 📁 Project Structure
```
project/
├── backend/
│   ├── server.js        ← Express API + MongoDB
│   ├── package.json
│   └── .env             ← MongoDB connection string
└── frontend/
    └── UserManagement.jsx  ← React component (Axios connected)
```

---

## 🚀 Setup & Run

### Step 1 — Prerequisites
- Node.js installed → https://nodejs.org
- MongoDB installed & running locally → https://www.mongodb.com/try/download/community
  OR use MongoDB Atlas (free cloud): https://www.mongodb.com/atlas

---

### Step 2 — Backend Setup
```bash
cd backend
npm install
npm run dev       # starts on http://localhost:5000
```

If using **MongoDB Atlas**, open `.env` and replace:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/usermanagement
```

---

### Step 3 — Frontend Setup
```bash
# In your React project:
npm install axios
```
Then copy `UserManagement.jsx` into your `src/` folder and import it:
```jsx
import UserManagement from './UserManagement';

function App() {
  return <UserManagement />;
}
```

---

## 🔌 API Endpoints

| Method | Endpoint                    | Description         |
|--------|-----------------------------|---------------------|
| GET    | /api/users                  | Get all users       |
| GET    | /api/users/:id              | Get user by MongoDB ID |
| POST   | /api/users                  | Create new user     |
| PUT    | /api/users/:id              | Update user         |
| DELETE | /api/users/:id              | Delete user         |
| GET    | /api/users/search/:query    | Search by ID or Code|

---

## 📦 Request Body (POST / PUT)
```json
{
  "name":        "Priya Sharma",
  "designation": "Software Engineer",
  "code":        "EMP001",
  "company":     "TechCorp",
  "email":       "priya@techcorp.com",
  "address":     "Mumbai, India"
}
```

---

## ✅ Features
- Add / Update / Delete / View users
- Search by MongoDB ID or Employee Code
- Real-time server connection indicator
- Loading spinners & error handling
- Toast notifications for all actions
- Data persists in MongoDB (survives page refresh)
