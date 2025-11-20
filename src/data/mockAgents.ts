export type AgentStatus = 'READY' | 'IN_CALL' | 'DISPO' | 'PAUSED' | 'DEAD'

export interface AgentRow {
  extension: string
  name: string
  callType: string
  status: AgentStatus
  statusTime: string
  currentCall: string
  readyTime: string
  sinceLast: string
  totalCalls: number
  session: string
  campaign: string
}

export const mockAgents: AgentRow[] = [
  {
    extension: '1001',
    name: 'Alex Johnson',
    callType: 'Outbound',
    status: 'READY',
    statusTime: '00:02:15',
    currentCall: '-',
    readyTime: '01:10:22',
    sinceLast: '00:05:40',
    totalCalls: 32,
    session: 'Morning',
    campaign: 'Medicare 2025',
  },
  {
    extension: '1002',
    name: 'Maria Rodriguez',
    callType: 'Inbound',
    status: 'IN_CALL',
    statusTime: '00:04:48',
    currentCall: 'Lead #4583',
    readyTime: '00:45:12',
    sinceLast: '00:00:00',
    totalCalls: 27,
    session: 'Afternoon',
    campaign: 'Follow Up',
  },
  {
    extension: '1003',
    name: 'Sam Patel',
    callType: 'Outbound',
    status: 'DISPO',
    statusTime: '00:01:32',
    currentCall: 'Lead #4581',
    readyTime: '00:52:08',
    sinceLast: '00:03:10',
    totalCalls: 30,
    session: 'Morning',
    campaign: 'Medicare 2025',
  },
  {
    extension: '1004',
    name: 'Taylor Smith',
    callType: 'Outbound',
    status: 'PAUSED',
    statusTime: '00:06:05',
    currentCall: '-',
    readyTime: '00:40:30',
    sinceLast: '00:08:22',
    totalCalls: 18,
    session: 'Morning',
    campaign: 'New Leads',
  },
  {
    extension: '1005',
    name: 'Jordan Lee',
    callType: 'Inbound',
    status: 'DEAD',
    statusTime: '00:00:45',
    currentCall: 'Lead #4579',
    readyTime: '00:38:14',
    sinceLast: '00:10:10',
    totalCalls: 22,
    session: 'Afternoon',
    campaign: 'Follow Up',
  },
]
