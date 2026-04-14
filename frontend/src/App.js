import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

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
    const res = await axios.get('http://localhost:5000/notes');
    setNotes(res.data);
  };

  // 🔥 AUTO SAVE (FIXED + OPTIMIZED)
  useEffect(() => {
    if (!selectedId) return; // prevent new note auto-save

    const timer = setTimeout(() => {
      axios.put(`http://localhost:5000/notes/${selectedId}`, {
        title,
        content
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [title, content, selectedId]); // ✅ FIXED dependency

  // CREATE
  const saveNote = async () => {
    if (!title && !content) return;

    await axios.post('http://localhost:5000/notes', {
      title,
      content
    });

    setTitle('');
    setContent('');
    setSelectedId(null);
    fetchNotes();
  };

  // EDIT
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  // DELETE
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);

    // Reset editor if deleted note is open
    if (id === selectedId) {
      setTitle('');
      setContent('');
      setSelectedId(null);
    }

    fetchNotes();
  };

  // 🔍 SEARCH
  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      fetchNotes();
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/notes/search?q=${value}`
    );
    setNotes(res.data);
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