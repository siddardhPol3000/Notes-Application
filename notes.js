// Selecting elements
const notesTitleInput = document.getElementById("notes-title");
const notesInput = document.getElementById("notes-text");
const addNotesBtn = document.getElementById("add-notes");
const notesContainer = document.getElementById("notes-container");
const searchBar = document.getElementById("search-bar");
const themeToggle = document.getElementById("theme-toggle");

// Load notes and theme from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    loadTheme();
});

// Function to add notes
function addNotes() {
    const notesTitle = notesTitleInput.value.trim();
    const notesText = notesInput.value.trim();

    if (notesTitle === "" || notesText === "") {
        alert("Please enter both title and notes!");
        return;
    }

    // Create notes element
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
        <h3>${notesTitle}</h3>
        <p>${notesText}</p>
        <button class="delete-btn">🗑️</button>
    `;

    // Append to notes container
    notesContainer.appendChild(note);

    // Save notes to localStorage
    saveNotes();

    // Clear input fields
    notesTitleInput.value = "";
    notesInput.value = "";

    // Add delete functionality
    note.querySelector(".delete-btn").addEventListener("click", () => {
        note.remove();
        saveNotes();
    });
}

// Event Listener for add notes button
addNotesBtn.addEventListener("click", addNotes);

// Allow Enter key to add notes
notesInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addNotes();
    }
});

// Function to save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".notes").forEach((note) => {
        const title = note.querySelector("h3").innerText;
        const content = note.querySelector("p").innerText;
        notes.push({ title, content });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach(({ title, content }) => {
        const note = document.createElement("div");
        note.classList.add("notes");
        note.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <button class="delete-btn">🗑️</button>
        `;

        notesContainer.appendChild(note);

        // Add delete functionality
        note.querySelector(".delete-btn").addEventListener("click", () => {
            note.remove();
            saveNotes();
        });
    });
}

// Search functionality
searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase();
    const notes = document.querySelectorAll(".notes");

    notes.forEach((note) => {
        const title = note.querySelector("h3").innerText.toLowerCase();
        const content = note.querySelector("p").innerText.toLowerCase();

        note.style.display = title.includes(searchText) || content.includes(searchText) ? "block" : "none";
    });
});

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save theme preference
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Update theme toggle icon
    updateThemeIcon();
});

// Function to update theme icon
function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDarkMode ? "☀️" : "🌙";
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateThemeIcon();
}
