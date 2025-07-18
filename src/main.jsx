import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <GoogleOAuthProvider clientId='228634232882-hhjrshr9no0n8boq9tl2i5j8oiedp3e9.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
