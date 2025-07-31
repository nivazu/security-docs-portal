import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: #0a0e1a;
    color: #e2e8f0;
    overflow-x: hidden;
    position: relative;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1e293b;
  }

  ::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
`;

// Background pattern component
const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.03;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px);
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%);
  }
`;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 0.5rem;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #94a3b8;
  font-size: 1.1rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const BannerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 1s ease-out 0.4s both;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BannerCard = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(59, 130, 246, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const BannerIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const BannerTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const BannerType = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const ViewerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 14, 26, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ViewerContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
`;

const ViewerHeader = styled.div`
  padding: 1.5rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #e2e8f0;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 20px rgba(239, 68, 68, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ViewerContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PDFContainer = styled.div`
  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-pdf__Page {
    max-width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const ExcelViewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
    background: white;
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #1e293b;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
`;

// Components
const Banner = ({ document, onClick }) => {
  const getIcon = () => {
    if (document.type === 'pdf') return '📄';
    if (document.type === 'excel') return '📊';
    return '📋';
  };

  return (
    <BannerCard onClick={() => onClick(document)}>
      <BannerIcon>{getIcon()}</BannerIcon>
      <BannerTitle>{document.title}</BannerTitle>
      <BannerType>{document.type} Document</BannerType>
    </BannerCard>
  );
};

const DocumentViewer = ({ document, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPageNumber(1);
  }, [document]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setError('Failed to load document. Please try again.');
    setLoading(false);
  };

  return (
    <ViewerOverlay onClick={onClose}>
      <ViewerContainer onClick={(e) => e.stopPropagation()}>
        <ViewerHeader>
          <ViewerTitle>{document.title}</ViewerTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ViewerHeader>
        <ViewerContent>
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!loading && !error && document.type === 'pdf' && (
            <PDFContainer>
              <Document
                file={document.documentPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<LoadingSpinner />}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={Math.min(window.innerWidth * 0.8, 800)}
                  />
                ))}
              </Document>
            </PDFContainer>
          )}
          {!loading && !error && document.type === 'excel' && (
            <ExcelViewer>
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + document.documentPath)}`}
                title={document.title}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setError('Unable to display Excel file. You can download it instead.');
                  setLoading(false);
                }}
              />
              {error && (
                <div style={{ marginTop: '2rem' }}>
                  <a 
                    href={document.documentPath} 
                    download 
                    style={{ 
                      color: '#3b82f6', 
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'inline-block',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Download Excel File
                  </a>
                </div>
              )}
            </ExcelViewer>
          )}
        </ViewerContent>
      </ViewerContainer>
    </ViewerOverlay>
  );
};

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
    {
      id: '5',
      title: 'Security Audit Results',
      documentPath: '/documents/security_audit_results.pdf',
      type: 'pdf',
    },
    {
      id: '6',
      title: 'Risk Assessment Matrix',
      documentPath: '/documents/risk_assessment_matrix.xlsx',
      type: 'excel',
    },
  ];

  const handleBannerClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundPattern />
      <AppContainer>
        <Header>
          <Title>Security Documents Portal</Title>
          <Subtitle>Access official security documentation and reports</Subtitle>
        </Header>
        <MainContent>
          <BannerGrid>
            {documents.map((doc) => (
              <Banner key={doc.id} document={doc} onClick={handleBannerClick} />
            ))}
          </BannerGrid>
        </MainContent>
        {selectedDocument && (
          <DocumentViewer document={selectedDocument} onClose={handleCloseViewer} />
        )}
      </AppContainer>
    </>
  );
}

export default App;
