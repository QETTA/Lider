import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/design-system.css'
import './styles/accessibility.css'
import { EmotionModeProvider } from './hooks/useEmotionMode'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmotionModeProvider>
      <App />
    </EmotionModeProvider>
  </React.StrictMode>,
)
