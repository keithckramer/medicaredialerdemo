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
} from '@mui/material'
import { useState } from 'react'

const metrics = {
  totalCallsPlaced: 91,
  callsRinging: 21,
  agentsLoggedIn: 43,
  agentsWaiting: 6,
  agentsInCall: 31,
  agentsInDispo: 5,
  agentsPaused: 1,
  agentsInDeadCall: 0,
}

export default function AgentMonitorPage() {
  const [campaign, setCampaign] = useState('All Campaigns')
  const [queue, setQueue] = useState('All Queues')
  const [refreshRate, setRefreshRate] = useState<'stop' | 'slow' | 'fast'>(
    'fast',
  )

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
              {metrics.agentsLoggedIn}
            </Typography>
            <Typography align="center">Agents Logged In</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#29b6f6', color: 'white' }}>
            <Typography variant="h3" align="center">
              {metrics.agentsWaiting}
            </Typography>
            <Typography align="center">Agents Waiting</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#66bb6a', color: 'white' }}>
            <Typography variant="h3" align="center">
              {metrics.agentsInCall}
            </Typography>
            <Typography align="center">Agents In Call</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#ffee58', color: 'black' }}>
            <Typography variant="h3" align="center">
              {metrics.agentsInDispo}
            </Typography>
            <Typography align="center">Agents In Dispo</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#ffb74d', color: 'black' }}>
            <Typography variant="h3" align="center">
              {metrics.agentsPaused}
            </Typography>
            <Typography align="center">Agents Paused</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Paper sx={{ p: 2, bgcolor: '#e57373', color: 'white' }}>
            <Typography variant="h3" align="center">
              {metrics.agentsInDeadCall}
            </Typography>
            <Typography align="center">Agents In Dead Call</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
