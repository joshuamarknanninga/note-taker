const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Paths
const dbPath = path.join(__dirname, 'db', 'db.json');

// Helper function to read notes from db.json
const readNotes = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const notes = JSON.parse(data);
          resolve(notes);
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
};

// Helper function to write notes to db.json
const writeNotes = (notes) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// =====================
// API Routes - Define First
// =====================

// GET /api/notes - Return all notes as JSON
app.get('/api/notes', async (req, res) => {
  console.log('Received GET /api/notes request');
  try {
    const notes = await readNotes();
    console.log('Successfully retrieved notes:', notes);
    res.json(notes);
  } catch (error) {
    console.error('Error reading notes:', error);
    res.status(500).json({ error: 'Failed to read notes.' });
  }
});

// POST /api/notes - Create a new note
app.post('/api/notes', async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Please provide both title and text for the note.' });
  }

  const newNote = {
    id: uuidv4(),
    title,
    text,
  };

  try {
    const notes = await readNotes();
    notes.push(newNote);
    await writeNotes(notes);
    console.log('Note saved successfully:', newNote);
    res.json(newNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Failed to save note.' });
  }
});

// DELETE /api/notes/:id - Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  try {
    let notes = await readNotes();
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== noteId);

    if (notes.length === initialLength) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    await writeNotes(notes);
    console.log(`Note with ID ${noteId} deleted successfully.`);
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note.' });
  }
});

// =====================
// HTML Routes - Define After API Routes
// =====================

// GET /notes - Serve notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET * - Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
