import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure root element exists and create root
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

// Create root and render with error boundary
createRoot(root).render(<App />);