import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx is executing')

const root = document.getElementById('root')
console.log('Root element:', root)

if (root) {
  console.log('Attempting to render App')
  createRoot(root).render(<App />)
  console.log('App rendered')
}