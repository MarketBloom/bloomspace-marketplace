import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting application mount...')

const root = document.getElementById('root')
if (root) {
  console.log('Root element found, creating React root...')
  try {
    const reactRoot = createRoot(root)
    console.log('React root created, rendering app...')
    reactRoot.render(
      <App />
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error during app initialization:', error)
  }
} else {
  console.error('Root element not found')
}