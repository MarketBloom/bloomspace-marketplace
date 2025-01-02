import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting application initialization...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

try {
  console.log('Creating React root...')
  const root = createRoot(rootElement)
  console.log('Rendering App component...')
  root.render(<App />)
  console.log('App rendered successfully')
} catch (error) {
  console.error('Failed to render app:', error)
  throw error
}