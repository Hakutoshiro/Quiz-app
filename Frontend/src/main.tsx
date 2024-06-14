import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <BrowserRouter>
      <main className="purple-dark text-foreground bg-background min-h-screen">
        <App />
      </main>
    </BrowserRouter>
  </NextUIProvider>
)
