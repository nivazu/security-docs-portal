// Storage configuration
const STORAGE_KEY = 'secureDocs';

// Password validation
const CORRECT_PASSWORD = 'Nehalim';

// DOM elements for password modal
const passwordModal = document.getElementById('password-modal');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

// Function to handle password submission
function handlePasswordSubmit(e) {
    e.preventDefault();
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password - hide modal and show main content
        passwordModal.classList.remove('active');
        renderDocuments();
    } else {
        // Wrong password - show error message
        passwordError.textContent = 'סיסמה שגויה. נסה שוב.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Add event listener for password form submission
passwordForm.addEventListener('submit', handlePasswordSubmit);

// Focus on password input when page loads
window.addEventListener('DOMContentLoaded', () => {
    passwordInput.focus();
});

// Helper functions for localStorage
function getDocumentsFromStorage() {
    const docs = localStorage.getItem(STORAGE_KEY);
    // If no documents are in storage, initialize with default data
    if (!docs) {
        const defaultDocs = [
            { id: Date.now(), title: 'דוח אבטחה - רבעון 1', type: 'pdf', filePath: 'documents/report-q1.pdf' },
            { id: Date.now() + 1, title: 'רשימת הרשאות עובדים', type: 'excel', filePath: 'documents/access-list-q1.xlsx' }
        ];
        saveDocumentsToStorage(defaultDocs);
        return defaultDocs;
    }
    return JSON.parse(docs);
}

function saveDocumentsToStorage(docs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

// Get documents from storage
const documents = getDocumentsFromStorage();

// DOM elements
const documentList = document.getElementById('document-list');
const modal = document.getElementById('document-modal');
const documentViewer = document.getElementById('document-viewer');
const closeBtn = document.querySelector('.close-btn');

// Function to get icon based on file type
function getDocumentIcon(type) {
    const icons = {
        pdf: '📄',
        excel: '📊',
        word: '📝',
        powerpoint: '📽️',
        image: '🖼️',
        default: '📎'
    };
    return icons[type] || icons.default;
}

// Function to render documents
function renderDocuments() {
    documentList.innerHTML = '';
    
    documents.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'document-card';
        card.innerHTML = `
            <div class="document-icon">${getDocumentIcon(doc.type)}</div>
            <h3 class="document-title">${doc.title}</h3>
            <p class="document-type">${doc.type.toUpperCase()}</p>
        `;
        
        card.addEventListener('click', () => openDocument(doc));
        documentList.appendChild(card);
    });
}

// Function to open document in modal
function openDocument(doc) {
    modal.classList.add('active');
    
    // Display document content based on type
    if (doc.type === 'pdf') {
        documentViewer.innerHTML = `
            <h2>${doc.title}</h2>
            <iframe src="${doc.filePath}" width="100%" height="600px" style="border: none;"></iframe>
        `;
    } else if (doc.type === 'excel') {
        // Use Microsoft Office Online viewer for Excel files
        const encodedUrl = encodeURIComponent(window.location.origin + '/' + doc.filePath);
        documentViewer.innerHTML = `
            <h2>${doc.title}</h2>
            <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}" width="100%" height="600px" style="border: none;"></iframe>
        `;
    } else if (doc.type === 'word') {
        // Use Microsoft Office Online viewer for Word files
        const encodedUrl = encodeURIComponent(window.location.origin + '/' + doc.filePath);
        documentViewer.innerHTML = `
            <h2>${doc.title}</h2>
            <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}" width="100%" height="600px" style="border: none;"></iframe>
        `;
    } else {
        documentViewer.innerHTML = `
            <h2>${doc.title}</h2>
            <p>תצוגה מקדימה אינה זמינה לסוג קובץ זה.</p>
            <a href="${doc.filePath}" download>הורד מסמך</a>
        `;
    }
}

// Close modal event
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    documentViewer.innerHTML = '';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        documentViewer.innerHTML = '';
    }
});

// Note: renderDocuments() is now called only after successful password validation