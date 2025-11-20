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
    extension: '101',
    name: 'Sample Agent 1',
    callType: 'Out',
    status: 'READY',
    statusTime: '00:00:21',
    currentCall: '00:00:00',
    readyTime: '00:00:13',
    sinceLast: '00:00:13',
    totalCalls: 1,
    session: '07:31:39',
    campaign: 'Sample Campaign',
  },
  {
    extension: '102',
    name: 'Sample Agent 2',
    callType: 'Out',
    status: 'IN_CALL',
    statusTime: '00:01:02',
    currentCall: '00:01:02',
    readyTime: '00:00:05',
    sinceLast: '00:01:02',
    totalCalls: 42,
    session: '06:20:12',
    campaign: 'Sample Campaign',
  },
  {
    extension: '103',
    name: 'Sample Agent 3',
    callType: 'In',
    status: 'DISPO',
    statusTime: '00:00:48',
    currentCall: '00:00:00',
    readyTime: '00:00:30',
    sinceLast: '00:00:48',
    totalCalls: 18,
    session: '05:45:10',
    campaign: 'Support Queue',
  },
  {
    extension: '104',
    name: 'Sample Agent 4',
    callType: 'Out',
    status: 'PAUSED',
    statusTime: '00:02:15',
    currentCall: '00:00:00',
    readyTime: '00:00:00',
    sinceLast: '00:02:15',
    totalCalls: 7,
    session: '04:12:33',
    campaign: 'Sample Campaign',
  },
  {
    extension: '105',
    name: 'Sample Agent 5',
    callType: 'Out',
    status: 'DEAD',
    statusTime: '00:05:42',
    currentCall: '00:00:00',
    readyTime: '00:00:00',
    sinceLast: '00:05:42',
    totalCalls: 23,
    session: '03:58:21',
    campaign: 'Retention',
  },
]
