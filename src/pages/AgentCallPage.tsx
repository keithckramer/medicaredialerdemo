// src/pages/AgentCallPage.tsx
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
  TextField,
} from '@mui/material'

type CallStatus = 'IDLE' | 'DIALING' | 'IN_CALL' | 'HOLD' | 'WRAPUP'

const mockLead = {
  id: '13120259',
  firstName: 'Misty',
  lastName: 'Liggins',
  primaryPhone: '(888) 638-4327',
  listName: 'Morning Test Upload Dont Del',
  cluster: 'Cluster13',
  campaign: 'Morning Test 13',
  state: 'CA',
  postalCode: '92357',
  email: 'misty@example.com',
  countryCode: '+1 United States',
  address1: '123 Main St',
  city: 'Los Angeles',
  createdBy: 'sampleadmin',
}

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (total % 60).toString().padStart(2, '0')
  return `00:${minutes}:${seconds}`
}

export default function AgentCallPage() {
  const [callStatus, setCallStatus] = useState<CallStatus>('IDLE')
  const [callSeconds, setCallSeconds] = useState(0)
  const [tab, setTab] = useState(0)

  // Simple timer: only runs while IN_CALL
  useEffect(() => {
    if (callStatus !== 'IN_CALL') return

    const id = setInterval(() => {
      setCallSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [callStatus])

  const handleStartCall = () => {
    setCallSeconds(0)
    setCallStatus('IN_CALL')
  }

  const handleHangup = () => {
    setCallStatus('WRAPUP')
  }

  const handleWrapup = () => {
    setCallStatus('IDLE')
    setCallSeconds(0)
  }

  const handleHold = () => {
    setCallStatus((prev) => (prev === 'HOLD' ? 'IN_CALL' : 'HOLD'))
  }

  const statusColor: Record<CallStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
    IDLE: 'default',
    DIALING: 'info',
    IN_CALL: 'success',
    HOLD: 'warning',
    WRAPUP: 'error',
  }

  return (
    <Box>
      {/* Header bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle2">Lead ID: {mockLead.id}</Typography>
            <Typography variant="h6">
              {mockLead.firstName} {mockLead.lastName} — {mockLead.primaryPhone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Campaign: {mockLead.campaign}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Stack spacing={0.5} textAlign="right">
              <Typography variant="caption" color="text.secondary">
                Call Status
              </Typography>
              <Chip
                label={callStatus.replace('_', ' ')}
                color={statusColor[callStatus]}
                size="small"
              />
            </Stack>

            <Stack spacing={0.5} textAlign="right">
              <Typography variant="caption" color="text.secondary">
                Call Time
              </Typography>
              <Typography variant="h6" fontFamily="monospace">
                {formatSeconds(callSeconds)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Call control buttons */}
        <Stack direction="row" spacing={1} mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleStartCall}
            disabled={callStatus === 'IN_CALL'}
          >
            CALL
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleHold}
            disabled={callStatus === 'IDLE' || callStatus === 'WRAPUP'}
          >
            {callStatus === 'HOLD' ? 'RESUME' : 'HOLD'}
          </Button>
          <Button variant="contained" color="info">
            TRANSFER
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleHangup}
            disabled={callStatus !== 'IN_CALL' && callStatus !== 'HOLD'}
          >
            HANGUP
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleWrapup}
            disabled={callStatus !== 'WRAPUP'}
          >
            WRAPUP
          </Button>
          <Button variant="outlined" color="primary">
            RECORD
          </Button>
        </Stack>
      </Paper>

      {/* Tabs + content (we'll flesh out Contact tab next codex) */}
      <Paper sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Contact" />
          <Tab label="Script" />
          <Tab label="Lead Qualification" />
        </Tabs>

        {tab === 0 && <ContactTab />}

        {tab === 1 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Call Script
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is where you can show the agent script for the campaign. For now, this is static
              text just to demonstrate layout.
            </Typography>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Lead Qualification
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Qualification questions / checklist would go here in the real app.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

// Split contact fields into their own component for clarity
function ContactTab() {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Default Fields
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="List" fullWidth size="small" defaultValue={mockLead.listName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Test List Name" fullWidth size="small" defaultValue="Test List Name" />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Cluster" fullWidth size="small" defaultValue={mockLead.cluster} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="State" fullWidth size="small" defaultValue={mockLead.state} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="First Name" fullWidth size="small" defaultValue={mockLead.firstName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Last Name" fullWidth size="small" defaultValue={mockLead.lastName} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Primary Phone"
            fullWidth
            size="small"
            defaultValue={mockLead.primaryPhone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Postal Code" fullWidth size="small" defaultValue={mockLead.postalCode} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Email" fullWidth size="small" defaultValue={mockLead.email} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Country Code" fullWidth size="small" defaultValue={mockLead.countryCode} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Address 1" fullWidth size="small" defaultValue={mockLead.address1} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="City" fullWidth size="small" defaultValue={mockLead.city} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Created By" fullWidth size="small" defaultValue={mockLead.createdBy} />
        </Grid>
      </Grid>
    </Box>
  )
}
