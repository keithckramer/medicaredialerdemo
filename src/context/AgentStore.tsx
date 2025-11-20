import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  type AgentRow,
  type AgentStatus,
  mockAgents as initialAgents,
} from '../data/mockAgents'

type AgentStoreContextValue = {
  agents: AgentRow[]
  setAgentStatus: (extension: string, status: AgentStatus) => void
}

const AgentStoreContext = createContext<AgentStoreContextValue | undefined>(
  undefined,
)

export function AgentStoreProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<AgentRow[]>(initialAgents)

  const setAgentStatus = (extension: string, status: AgentStatus) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.extension === extension ? { ...agent, status } : agent,
      ),
    )
  }

  return (
    <AgentStoreContext.Provider value={{ agents, setAgentStatus }}>
      {children}
    </AgentStoreContext.Provider>
  )
}

export function useAgentStore() {
  const ctx = useContext(AgentStoreContext)
  if (!ctx) throw new Error('useAgentStore must be used within AgentStoreProvider')
  return ctx
}
