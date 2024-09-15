const notesContainer = document.getElementById('notes-container');
const saveButton = document.getElementById('save-note');
const clearButton = document.getElementById('clear-form');
const newNoteButton = document.getElementById('new-note');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');

let activeNote = null;

// Fetch and display all notes
const fetchNotes = async () => {
  const response = await fetch('/api/notes');
  const notes = await response.json();
  displayNotes(notes);
};

// Display notes in the list
const displayNotes = (notes) => {
  notesContainer.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '0.5rem 0';
    li.style.borderBottom = '1px solid #ccc';
    li.style.cursor = 'pointer';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = note.title;
    titleSpan.style.flex = '1';
    titleSpan.addEventListener('click', () => displayNote(note));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#e74c3c';
    deleteBtn.style.color = '#fff';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '0.3rem 0.6rem';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
        handleDelete(note.id);
      }
    });

    li.appendChild(titleSpan);
    li.appendChild(deleteBtn);
    notesContainer.appendChild(li);
  });
};

// Display a single note in the form
const displayNote = (note) => {
  activeNote = note;
  noteTitle.value = note.title;
  noteText.value = note.text;
  saveButton.classList.add('hidden');
  clearButton.classList.add('hidden');
  newNoteButton.classList.remove('hidden');
};

// Handle saving a new note
saveButton.addEventListener('click', async () => {
  const title = noteTitle.value.trim();
  const text = noteText.value.trim();

  if (title && text) {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text }),
    });

    if (response.ok) {
      const newNote = await response.json();
      fetchNotes();
      clearForm();
    } else {
      alert('Failed to save note.');
    }
  }
});

// Handle clearing the form
clearButton.addEventListener('click', () => {
  clearForm();
});

// Handle creating a new note
newNoteButton.addEventListener('click', () => {
  clearForm();
  newNoteButton.classList.add('hidden');
});

// Clear the form fields and reset buttons
const clearForm = () => {
  activeNote = null;
  noteTitle.value = '';
  noteText.value = '';
  saveButton.classList.remove('hidden');
  clearButton.classList.remove('hidden');
  newNoteButton.classList.add('hidden');
};

// Handle deleting a note
const handleDelete = async (id) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    fetchNotes();
    clearForm();
  } else {
    alert('Failed to delete note.');
  }
};

// Initialize
fetchNotes();
