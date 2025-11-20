import Grid from '@mui/material/Grid'
import { Box, Divider, LinearProgress, Paper, Stack, Typography } from '@mui/material'

const overviewStats = [
  { label: 'Campaigns', value: 8 },
  { label: 'Queues', value: 4 },
  { label: 'Leads', value: '12,450' },
]

const todayStats = [
  { label: 'Total dials', value: 182 },
  { label: 'Connected', value: 96 },
  { label: 'Conversions', value: 18 },
]

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={3} justifyContent="space-between">
              {overviewStats.map((stat) => (
                <Box key={stat.label}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Today&apos;s calls
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {todayStats.map((stat) => (
                <Stack
                  key={stat.label}
                  direction="row"
                  alignItems="baseline"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Contact rate
                </Typography>
                <LinearProgress value={62} variant="determinate" />
                <Typography variant="caption" color="text.secondary">
                  62% connected on first attempt
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Performance trend
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                height: 240,
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider',
                bgcolor: (theme) => theme.palette.grey[50],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
                textAlign: 'center',
                px: 2,
              }}
            >
              <Typography>
                A small chart placeholder goes here.
                <br />
                Hook up any MUI-friendly chart library when ready.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}
