import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import  { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import TopBar from './components/TopBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </StrictMode>,
)
