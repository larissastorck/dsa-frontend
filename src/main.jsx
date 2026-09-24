import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import App from './Lista-Virtualizada/App.jsx'//Lista Virtualizada sem div
//import { ScrollDiv } from './Lista-Virtualizada/ScrollWithDiv.jsx'//Lista Virtualizada com div pra handle scroll
//import { ScrollWithVisibleItens } from './Lista-Virtualizada/ScrollWithVisibleItens.jsx'//Lista Virtualizada calculo de itens visíveis na tela
//import App from './LRU-LFU-Cache/LRUCache.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
