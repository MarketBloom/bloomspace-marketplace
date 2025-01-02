import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Application initialization starting...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Fatal: Root element not found in DOM')
  throw new Error('Root element not found')
}

try {
  console.log('Creating React root...')
  const root = createRoot(rootElement)
  
  console.log('Rendering application...')
  root.render(<App />)
  
  console.log('Application rendered successfully')
} catch (error) {
  console.error('Critical error during application initialization:', error)
  console.error('Error details:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause
  })
  throw error
}