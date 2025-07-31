// Storage configuration
const STORAGE_KEY = 'secureDocs';

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

// Get file extension from filename
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

// Determine file type from extension
function getFileType(extension) {
    const typeMap = {
        'pdf': 'pdf',
        'xlsx': 'excel',
        'xls': 'excel',
        'doc': 'word',
        'docx': 'word',
        'ppt': 'powerpoint',
        'pptx': 'powerpoint',
        'jpg': 'image',
        'jpeg': 'image',
        'png': 'image',
        'gif': 'image'
    };
    return typeMap[extension] || 'default';
}

// Render document list
function renderAdminList() {
    const documents = getDocumentsFromStorage();
    const adminDocList = document.getElementById('admin-doc-list');
    adminDocList.innerHTML = '';
    
    documents.forEach(doc => {
        const docItem = document.createElement('div');
        docItem.className = 'doc-list-item';
        docItem.innerHTML = `
            <div>
                <strong>${doc.title}</strong>
                <span style="margin-right: 1rem; color: #94a3b8;">${doc.type.toUpperCase()}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" data-id="${doc.id}">ערוך</button>
                <button class="delete-btn" data-id="${doc.id}">מחק</button>
            </div>
        `;
        adminDocList.appendChild(docItem);
    });
}

// Form elements
const docForm = document.getElementById('doc-form');
const docIdInput = document.getElementById('doc-id');
const docTitleInput = document.getElementById('doc-title');
const docFileInput = document.getElementById('doc-file');

// Form submission
docForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const documents = getDocumentsFromStorage();
    const docId = docIdInput.value;
    const docTitle = docTitleInput.value;
    const docFile = docFileInput.files[0];
    
    if (docId) {
        // Update existing document
        const docIndex = documents.findIndex(d => d.id == docId);
        if (docIndex !== -1) {
            documents[docIndex].title = docTitle;
            // If a new file is selected, update the file path
            if (docFile) {
                const extension = getFileExtension(docFile.name);
                documents[docIndex].type = getFileType(extension);
                documents[docIndex].filePath = `documents/${docFile.name}`;
            }
        }
    } else {
        // Create new document
        if (!docFile) {
            alert('יש לבחור קובץ למסמך חדש');
            return;
        }
        
        const extension = getFileExtension(docFile.name);
        const newDoc = {
            id: Date.now(),
            title: docTitle,
            type: getFileType(extension),
            filePath: `documents/${docFile.name}`
        };
        documents.push(newDoc);
    }
    
    // Save and refresh
    saveDocumentsToStorage(documents);
    renderAdminList();
    
    // Reset form
    docForm.reset();
    docIdInput.value = '';
});

// Handle edit and delete clicks
document.getElementById('admin-doc-list').addEventListener('click', (e) => {
    const documents = getDocumentsFromStorage();
    
    if (e.target.classList.contains('edit-btn')) {
        const docId = e.target.getAttribute('data-id');
        const doc = documents.find(d => d.id == docId);
        
        if (doc) {
            docIdInput.value = doc.id;
            docTitleInput.value = doc.title;
            docTitleInput.focus();
        }
    }
    
    if (e.target.classList.contains('delete-btn')) {
        const docId = e.target.getAttribute('data-id');
        
        if (confirm('האם אתה בטוח שברצונך למחוק מסמך זה?')) {
            const filteredDocs = documents.filter(d => d.id != docId);
            saveDocumentsToStorage(filteredDocs);
            renderAdminList();
        }
    }
});

// Initialize
renderAdminList();