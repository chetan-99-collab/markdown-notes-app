# 📝 Markdown Notes Application

A full-stack Notes Application that supports Markdown editing, real-time preview, and complete CRUD operations.

---

## 🚀 Live Demo

*(Add your deployed link here after deployment)*
👉 Example: https://your-app.vercel.app

---

## 📦 GitHub Repository

👉 https://github.com/your-username/markdown-notes-app

---

## 🎯 Objective

Build a full-stack application where users can:

* Create notes using Markdown
* Preview formatted output in real-time
* Perform full CRUD operations
* Persist data in a database

---

## 🧱 Tech Stack

| Layer              | Technology        |
| ------------------ | ----------------- |
| Frontend           | React.js          |
| Backend            | Node.js (Express) |
| Database           | SQLite            |
| Styling            | CSS               |
| API Calls          | Axios             |
| Markdown Rendering | React-Markdown    |

---

## ✨ Features

### ✅ Core Features

* Create, edit, delete, and list notes
* Markdown editor with live preview (split-screen)
* Persistent storage using SQLite
* RESTful API integration

---

### 🚀 Advanced Features (Implemented)

* 🔥 Debounced Auto-Save (prevents API spamming)
* 🔍 Search notes (title + content)
* 🌙 Dark Mode toggle
* 🕒 Timestamps (created_at, updated_at)
* 🧠 Optimized API calls and state handling

---

## 📐 Architecture

```
Client (React)
   ↓
REST API (Express)
   ↓
SQLite Database
```

---

## 📁 Project Structure

```
markdown-notes-app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── database.db
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.js
        ├── App.css
        └── index.js
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/markdown-notes-app.git
cd markdown-notes-app
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### 📥 Get All Notes

```
GET /notes
```

### ➕ Create Note

```
POST /notes
Body:
{
  "title": "Note Title",
  "content": "Markdown content"
}
```

### ✏️ Update Note

```
PUT /notes/:id
```

### ❌ Delete Note

```
DELETE /notes/:id
```

### 🔍 Search Notes

```
GET /notes/search?q=keyword
```

---

## 🧠 Key Engineering Decisions

### 1. Debounced Auto-Save

Instead of saving on every keystroke, a delay of 800ms is used to:

* Reduce API calls
* Improve performance
* Avoid unnecessary database writes

---

### 2. SQLite Database

* Lightweight and easy to set up
* No external configuration required
* Suitable for small-scale applications

---

### 3. RESTful API Design

* Clean and predictable endpoints
* Proper HTTP methods used (GET, POST, PUT, DELETE)

---

### 4. State Management

* Managed using React hooks (`useState`, `useEffect`)
* Optimized to avoid unnecessary re-renders

---

## ⚡ Performance Considerations

* Debounced API calls
* Efficient SQL queries with indexing potential
* Minimal re-renders using controlled components

---

## 🎨 UI Design

* Clean and minimal interface
* Split-screen editor and preview
* Functional over decorative

---

## ⚠️ Trade-offs

* No authentication implemented (kept scope focused)
* SQLite used instead of scalable DB (PostgreSQL)
* No pagination (can be added for large datasets)

---

## 🚀 Future Improvements

* 🔐 User Authentication (JWT)
* 🏷 Tags & Categories
* 📜 Version History
* 🌍 Deployment with CI/CD
* 📱 Mobile responsiveness

---

## 🎥 Demo Video

*(Add your Google Drive / YouTube link here)*

---

## 🙌 Acknowledgements

* React Documentation
* Express.js Docs
* Markdown Syntax Guide

---

## 📬 Contact

**Name:** Chetan Kethineni
**Email:** [chetankethineni06@gmail.com](mailto:chetankethineni06@gmail.com)

---

## ⭐ Final Note

This project focuses on **clean architecture, performance, and real-world engineering practices** rather than UI complexity.

---
