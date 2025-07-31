import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: '1',
      title: 'Security Policy V2.1',
      documentPath: '/documents/security_policy_v2_1.pdf',
      type: 'pdf',
    },
    {
      id: '2',
      title: 'Incident Response Plan',
      documentPath: '/documents/incident_response_plan.pdf',
      type: 'pdf',
    },
    {
      id: '3',
      title: 'Q3 Financial Report',
      documentPath: '/documents/q3_financial_report.xlsx',
      type: 'excel',
    },
    {
      id: '4',
      title: 'Compliance Checklist 2024',
      documentPath: '/documents/compliance_checklist_2024.pdf',
      type: 'pdf',
    },
  ];

  const handleBannerClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="App">
      {selectedDocument ? (
        <DocumentViewer document={selectedDocument} onClose={handleCloseViewer} />
      ) : (
        <div className="banner-grid">
          {documents.map((doc) => (
            <Banner key={doc.id} document={doc} onClick={handleBannerClick} />
          ))}
        </div>
      )}
    </div>
  );
}

// Placeholder for Banner Component
const Banner = ({ document, onClick }) => {
  return (
    <div className="banner" onClick={() => onClick(document)}>
      <h3>{document.title}</h3>
      <p>{document.type.toUpperCase()} Document</p>
    </div>
  );
};

// Placeholder for DocumentViewer Component
const DocumentViewer = ({ document, onClose }) => {
  return (
    <div className="document-viewer">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Viewing: {document.title}</h2>
      {document.type === 'pdf' && (
        <p>PDF Viewer will go here for: {document.documentPath}</p>
        // Placeholder for react-pdf or similar component
      )}
      {document.type === 'excel' && (
        <p>Excel Viewer will go here for: {document.documentPath}</p>
        // Placeholder for an Excel viewer/renderer
      )}
    </div>
  );
};

export default App;
