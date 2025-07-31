# Security Documents Portal

A professional web application for viewing security documents, designed with a modern, minimalist aesthetic suitable for a large security company's official documentation system.

## Features

- **Professional Design**: Dark theme with subtle gradients and animations
- **Document Support**: View PDF and Excel files directly in the browser
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Modern UI**: Rounded corner banners with hover effects and smooth transitions
- **In-Browser Viewing**: Documents open within the application, not in new tabs
- **Security-Focused Aesthetic**: Professional design suitable for official security documentation

## Technology Stack

- **React 18**: Modern React with hooks
- **Styled Components**: CSS-in-JS for component styling
- **react-pdf**: PDF rendering in the browser
- **Office Online Viewer**: Excel file viewing support
- **Vercel**: Optimized for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd security-docs-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Adding Documents

Place your PDF and Excel files in the `public/documents/` directory. Then update the `documents` array in `src/App.js` to include your files:

```javascript
const documents = [
  {
    id: '1',
    title: 'Your Document Title',
    documentPath: '/documents/your-document.pdf',
    type: 'pdf', // or 'excel'
  },
  // Add more documents...
];
```

## Deployment on Vercel

### Method 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

Follow the prompts to complete deployment.

### Method 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Sign in and click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a React app
6. Click "Deploy"

### Environment Configuration

No special environment variables are required for basic functionality.

## Design Features

- **Color Palette**: Deep blues and grays suitable for security documentation
- **Typography**: Inter font for excellent readability
- **Animations**: Smooth fade-in and hover effects
- **Background**: Subtle geometric patterns for visual interest
- **Icons**: Document type indicators (📄 for PDF, 📊 for Excel)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Excel files are displayed using Microsoft's Office Online viewer, which requires an internet connection
- Large PDF files may take time to load
- Some Excel features may not be fully supported in the web viewer

## Future Enhancements

- Search functionality across documents
- Document categorization
- User authentication
- Document upload interface
- Full-text search within PDFs
- Download tracking

## License

This project is configured for internal use by a security organization.