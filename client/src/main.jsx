import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './stores/store.js'
import { Toaster } from './components/ui/sonner'


createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
     <App />
     <Toaster richColors position="top-right"  />
     </Provider>
    
 
)
