import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting application initialization...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found - DOM might not be ready')
  throw new Error('Root element not found')
}

try {
  console.log('Creating React root...')
  const root = createRoot(rootElement)
  
  console.log('Rendering App component...')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('App rendered successfully')
} catch (error) {
  console.error('Failed to render app:', error)
  // Log additional details that might help debugging
  console.error('Error details:', {
    errorName: error.name,
    errorMessage: error.message,
    errorStack: error.stack
  })
  throw error
}