import { createRoot } from 'react-dom/client'
import './index.css'
import { GlobalContext } from './context/GlobalContext'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <GlobalContext>
        <App />
      </GlobalContext>
    </BrowserRouter>
)
