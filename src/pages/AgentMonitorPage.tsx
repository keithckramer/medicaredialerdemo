import Grid from '@mui/material/GridLegacy'
import {
  Box,
  Paper,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { useState } from 'react'
import { useAgentStore } from '../context/AgentStore'
import type { AgentStatus } from '../data/mockAgents'

const statusColors: Record<AgentStatus, string> = {
  READY: '#4FC3F7',
  IN_CALL: '#81C784',
  DISPO: '#FFF176',
  PAUSED: '#FFB74D',
  DEAD: '#E57373',
}

export default function AgentMonitorPage() {
  const [campaign, setCampaign] = useState('All Campaigns')
  const [queue, setQueue] = useState('All Queues')
  const [refreshRate, setRefreshRate] = useState<'stop' | 'slow' | 'fast'>(
    'fast',
  )
  const { agents } = useAgentStore()

  const countByStatus = (status: AgentStatus) =>
    agents.filter((a) => a.status === status).length

  const agentMetrics = {
    agentsLoggedIn: agents.length,
    agentsWaiting: countByStatus('READY'),
    agentsInCall: countByStatus('IN_CALL'),
    agentsInDispo: countByStatus('DISPO'),
    agentsPaused: countByStatus('PAUSED'),
    agentsInDeadCall: countByStatus('DEAD'),
  }

  return (
    <Box>
      {/* Filters */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <FormControl size="small">
          <InputLabel>Campaign</InputLabel>
          <Select
            label="Campaign"
            value={campaign}
            onChange={e => setCampaign(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="All Campaigns">All Campaigns</MenuItem>
            <MenuItem value="Sample Campaign">Sample Campaign</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Queue</InputLabel>
          <Select
            label="Queue"
            value={queue}
            onChange={e => setQueue(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="All Queues">All Queues</MenuItem>
            <MenuItem value="Inbound">Inbound</MenuItem>
            <MenuItem value="Outbound">Outbound</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">Refresh Rate:</Typography>
          <ButtonGroup size="small">
            <Button
              variant={refreshRate === 'stop' ? 'contained' : 'outlined'}
              onClick={() => setRefreshRate('stop')}
            >
              STOP
            </Button>
            <Button
              variant={refreshRate === 'slow' ? 'contained' : 'outlined'}
              onClick={() => setRefreshRate('slow')}
            >
              SLOW
            </Button>
            <Button
              variant={refreshRate === 'fast' ? 'contained' : 'outlined'}
              onClick={() => setRefreshRate('fast')}
            >
              FAST
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      {/* KPI tiles */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#757575', color: 'white' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsLoggedIn}
            </Typography>
            <Typography align="center">Agents Logged In</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#29b6f6', color: 'white' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsWaiting}
            </Typography>
            <Typography align="center">Agents Waiting</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#66bb6a', color: 'white' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsInCall}
            </Typography>
            <Typography align="center">Agents In Call</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#ffee58', color: 'black' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsInDispo}
            </Typography>
            <Typography align="center">Agents In Dispo</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#ffb74d', color: 'black' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsPaused}
            </Typography>
            <Typography align="center">Agents Paused</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#e57373', color: 'white' }}>
            <Typography variant="h3" align="center">
              {agentMetrics.agentsInDeadCall}
            </Typography>
            <Typography align="center">Agents In Dead Call</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Agent table */}
      <Box mt={4}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ext</TableCell>
              <TableCell>Agent Name</TableCell>
              <TableCell>Call Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Status Time</TableCell>
              <TableCell>Current Call</TableCell>
              <TableCell>Ready Time</TableCell>
              <TableCell>Since Last</TableCell>
              <TableCell>Total Calls</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Campaign</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map((agent) => (
              <TableRow
                key={agent.extension}
                sx={{ backgroundColor: statusColors[agent.status] }}
              >
                <TableCell>{agent.extension}</TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.callType}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell>{agent.statusTime}</TableCell>
                <TableCell>{agent.currentCall}</TableCell>
                <TableCell>{agent.readyTime}</TableCell>
                <TableCell>{agent.sinceLast}</TableCell>
                <TableCell>{agent.totalCalls}</TableCell>
                <TableCell>{agent.session}</TableCell>
                <TableCell>{agent.campaign}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}
