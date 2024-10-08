import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import QuestionsProvider from './contexts/QuestionsContext'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QuestionsProvider>
            <App />
        </QuestionsProvider>
    </StrictMode>
)
