import { useMemo, useState } from 'react'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import Grid from '@mui/material/GridLegacy'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { mockAgents, type AgentRow, type AgentStatus } from '../data/mockAgents'

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
  const [campaign, setCampaign] = useState('all')
  const [queue, setQueue] = useState('all')
  const [refreshRate, setRefreshRate] = useState('fast')

  const statusColors: Record<AgentStatus, string> = useMemo(
    () => ({
      READY: '#4FC3F7',
      IN_CALL: '#81C784',
      DISPO: '#FFF176',
      PAUSED: '#FFB74D',
      DEAD: '#E57373',
    }),
    [],
  )

  const legendItems: { label: string; color: string }[] = useMemo(
    () => [
      { label: 'PREVIEW', color: '#B39DDB' },
      { label: 'READY', color: statusColors.READY },
      { label: 'IN CALL', color: statusColors.IN_CALL },
      { label: 'DISPO', color: statusColors.DISPO },
      { label: 'PAUSED', color: statusColors.PAUSED },
      { label: 'DEAD', color: statusColors.DEAD },
      { label: 'TIMEOUT', color: '#90A4AE' },
    ],
    [statusColors],
  )

  const handleCampaignChange = (event: SelectChangeEvent) => {
    setCampaign(event.target.value)
  }

  const handleQueueChange = (event: SelectChangeEvent) => {
    setQueue(event.target.value)
  }

  const kpiTiles = [
    {
      label: 'Agents Logged In',
      value: metrics.agentsLoggedIn,
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: 40 }} />,
      color: 'primary.main',
    },
    {
      label: 'Waiting',
      value: metrics.agentsWaiting,
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      color: 'warning.main',
    },
    {
      label: 'In Call',
      value: metrics.agentsInCall,
      icon: <PhoneInTalkIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
    },
    {
      label: 'In Dispo',
      value: metrics.agentsInDispo,
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />,
      color: 'info.main',
    },
    {
      label: 'Paused',
      value: metrics.agentsPaused,
      icon: <PauseCircleOutlineIcon sx={{ fontSize: 40 }} />,
      color: 'secondary.main',
    },
    {
      label: 'Dead',
      value: metrics.agentsInDeadCall,
      icon: <ReportProblemOutlinedIcon sx={{ fontSize: 40 }} />,
      color: 'error.main',
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        Agent Monitor
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="campaign-label">Campaign</InputLabel>
            <Select
              labelId="campaign-label"
              id="campaign-select"
              label="Campaign"
              value={campaign}
              onChange={handleCampaignChange}
            >
              <MenuItem value="all">All Campaigns</MenuItem>
              <MenuItem value="medicare-2025">Medicare 2025</MenuItem>
              <MenuItem value="follow-up">Follow Up</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="queue-label">Queue</InputLabel>
            <Select
              labelId="queue-label"
              id="queue-select"
              label="Queue"
              value={queue}
              onChange={handleQueueChange}
            >
              <MenuItem value="all">All Queues</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="standard">Standard</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="flex-end">
            <ButtonGroup variant="contained" aria-label="refresh rate">
              <Button
                color={refreshRate === 'stop' ? 'primary' : 'inherit'}
                onClick={() => setRefreshRate('stop')}
              >
                STOP
              </Button>
              <Button
                color={refreshRate === 'slow' ? 'primary' : 'inherit'}
                onClick={() => setRefreshRate('slow')}
              >
                SLOW
              </Button>
              <Button
                color={refreshRate === 'fast' ? 'primary' : 'inherit'}
                onClick={() => setRefreshRate('fast')}
              >
                FAST
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {kpiTiles.map((tile) => (
          <Grid key={tile.label} item xs={12} sm={6} md={4} lg={2}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: tile.color,
                color: 'common.white',
              }}
            >
              {tile.icon}
              <Box>
                <Typography variant="h3" component="div">
                  {tile.value}
                </Typography>
                <Typography variant="subtitle1">{tile.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Extension</TableCell>
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
            {mockAgents.map((agent: AgentRow) => (
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
      </TableContainer>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
          {legendItems.map((item) => (
            <Stack key={item.label} direction="row" spacing={1} alignItems="center">
              <Box
                sx={{ width: 24, height: 24, borderRadius: 1, backgroundColor: item.color }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
