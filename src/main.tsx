import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting application mount...', new Date().toISOString())

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found', new Date().toISOString())
  throw new Error('Root element not found')
}

console.log('Root element found, creating React root...', new Date().toISOString())
try {
  const reactRoot = createRoot(root)
  console.log('React root created, rendering app...', new Date().toISOString())
  reactRoot.render(
    <App />
  )
  console.log('App rendered successfully', new Date().toISOString())
} catch (error) {
  console.error('Error during app initialization:', error, new Date().toISOString())
  throw error
}