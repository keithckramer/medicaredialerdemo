import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AgentCallPage from './pages/AgentCallPage'
import AgentMonitorPage from './pages/AgentMonitorPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/monitor" replace />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/monitor"
        element={
          <AppLayout>
            <AgentMonitorPage />
          </AppLayout>
        }
      />
      <Route
        path="/agent"
        element={
          <AppLayout>
            <AgentCallPage />
          </AppLayout>
        }
      />
    </Routes>
  )
}
