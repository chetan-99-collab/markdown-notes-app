import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

// 🔥 CHANGE: use deployed backend
const API_BASE = "https://markdown-notes-app-h1q3.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔥 AUTO SAVE (debounced)
  useEffect(() => {
    if (!selectedId) return;

    const timer = setTimeout(() => {
      axios.put(`${API_BASE}/notes/${selectedId}`, {
        title,
        content
      }).catch(err => console.error("Auto-save error:", err));
    }, 800);

    return () => clearTimeout(timer);
  }, [title, content, selectedId]);

  // CREATE
  const saveNote = async () => {
    if (!title && !content) return;

    try {
      await axios.post(`${API_BASE}/notes`, {
        title,
        content
      });

      setTitle('');
      setContent('');
      setSelectedId(null);
      fetchNotes();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // EDIT
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  // DELETE
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE}/notes/${id}`);

      if (id === selectedId) {
        setTitle('');
        setContent('');
        setSelectedId(null);
      }

      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔍 SEARCH
  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      fetchNotes();
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE}/notes/search?q=${value}`
      );
      setNotes(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className={darkMode ? 'dark container' : 'container'}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Notes</h3>

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button onClick={() => {
          setTitle('');
          setContent('');
          setSelectedId(null);
        }}>
          New Note
        </button>

        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <b
                onClick={() => editNote(note)}
                style={{ cursor: 'pointer' }}
              >
                {note.title || 'Untitled'}
              </b>
              <br />
              <small>{note.updated_at}</small>
              <br />
              <button onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* EDITOR */}
      <div className="editor">

        {/* LEFT */}
        <div className="left">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={saveNote}>
            {selectedId ? 'Update' : 'Save'}
          </button>
        </div>

        {/* RIGHT */}
        <div className="right">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
}

export default App;