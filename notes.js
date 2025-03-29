// Select elements
const notesTitleInput = document.getElementById("notes-title");
const notesInput = document.getElementById("notes-text");
const addNotesBtn = document.getElementById("add-notes");
const notesContainer = document.getElementById("notes-container");
const searchBar = document.getElementById("search-bar");
const themeToggle = document.getElementById("theme-toggle");
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");

// ✅ Check if script is loaded
console.log("Script loaded successfully!");

// Load notes and theme from localStorage when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    loadTheme();
    initializeSettingsMenu();
});

// Initialize settings menu functionality
function initializeSettingsMenu() {
    // Toggle settings menu when clicking the button
    settingsButton.addEventListener("click", function (event) {
        settingsMenu.classList.toggle("show");
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!settingsButton.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.classList.remove("show");
        }
    });
}

// Add note on button click
addNotesBtn.addEventListener("click", addNote);

// Function to add note
function addNote() {
    const title = notesTitleInput.value.trim();
    const content = notesInput.value.trim();

    if (!title || !content) {
        alert("Please enter both title and content!");
        return;
    }

    const noteId = Date.now().toString();
    addNoteToDOM(noteId, title, content);
    saveNoteToLocalStorage(noteId, title, content);

    // Clear input fields
    notesTitleInput.value = "";
    notesInput.value = "";
}

// Function to add note to DOM
function addNoteToDOM(id, title, content) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("notes");
    noteElement.setAttribute("data-id", id);

    noteElement.innerHTML = `
        <h4>${title}</h4>
        <p>${content}</p>
        <button class="delete-note">🗑️</button>
    `;

    noteElement.querySelector(".delete-note").addEventListener("click", () => deleteNote(id, noteElement));
    noteElement.style.opacity = "0";
    notesContainer.appendChild(noteElement);
    setTimeout(() => noteElement.style.opacity = "1", 100);
}

// Save note in LocalStorage
function saveNoteToLocalStorage(id, title, content) {
    const notes = getNotesFromLocalStorage();
    notes.push({ id, title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Get all notes from LocalStorage
function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

// Load notes from LocalStorage
function loadNotes() {
    const savedNotes = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    savedNotes.forEach(note => addNoteToDOM(note.id, note.title, note.content));
}

// Delete note
function deleteNote(id, noteElement) {
    if (confirm("Are you sure you want to delete this note?")) {
        noteElement.style.opacity = "0";
        setTimeout(() => {
            noteElement.remove();
            deleteNoteFromLocalStorage(id);
        }, 300);
    }
}

// Remove note from LocalStorage
function deleteNoteFromLocalStorage(id) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Search notes dynamically
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll(".notes").forEach(note => {
        const title = note.querySelector("h4").textContent.toLowerCase();
        const content = note.querySelector("p").textContent.toLowerCase();
        note.style.display = title.includes(query) || content.includes(query) ? "flex" : "none";
    });
});

// Toggle dark/light mode
const darkModeBtn = document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    darkModeBtn.textContent = isDarkMode ? "Disable Dark Theme" : "Enable Dark Theme";
});

// Load theme from LocalStorage
function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "Disable Dark Theme";
    } else {
        darkModeBtn.textContent = "Enable Dark Theme";
    }
}


// Load theme from LocalStorage
function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}
