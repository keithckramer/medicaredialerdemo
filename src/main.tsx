import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import theme from './theme'
import { AgentStoreProvider } from './context/AgentStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AgentStoreProvider>
          <App />
        </AgentStoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
