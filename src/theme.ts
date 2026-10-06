import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#245c49' },
    background: { default: '#f6f7f4', paper: '#ffffff' },
    text: { primary: '#192d25', secondary: '#5e6b64' },
  },
  typography: { fontFamily: '"Segoe UI", system-ui, sans-serif', h3: { fontWeight: 700 }, h4: { fontWeight: 700 } },
  shape: { borderRadius: 12 },
  components: { MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { textTransform: 'none' } } } },
})
