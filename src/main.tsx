import { createRoot } from 'react-dom/client'
import './index.css'
import { GlobalContext } from './context/GlobalContext'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <GlobalContext>
          <App />
        </GlobalContext>
      </BrowserRouter>
    </Provider>
)
