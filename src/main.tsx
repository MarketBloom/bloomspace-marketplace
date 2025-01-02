import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx is executing')

const root = document.getElementById('root')
if (root) {
  console.log('Root element found, mounting React app')
  createRoot(root).render(<App />)
} else {
  console.error('Root element not found')
}