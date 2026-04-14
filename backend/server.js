const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB
const db = new sqlite3.Database('./database.db');

// TABLE
db.run(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// GET ALL
app.get('/notes', (req, res) => {
  db.all('SELECT * FROM notes ORDER BY updated_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// SEARCH
app.get('/notes/search', (req, res) => {
  const q = req.query.q;

  db.all(
    `SELECT * FROM notes 
     WHERE title LIKE ? OR content LIKE ?
     ORDER BY updated_at DESC`,
    [`%${q}%`, `%${q}%`],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// CREATE
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  db.run(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// UPDATE
app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;

  db.run(
    `UPDATE notes 
     SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [title, content, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated' });
    }
  );
});

// DELETE
app.delete('/notes/:id', (req, res) => {
  db.run('DELETE FROM notes WHERE id = ?', req.params.id, function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted' });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});