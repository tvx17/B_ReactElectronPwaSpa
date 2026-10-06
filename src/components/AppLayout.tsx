import { lazy, Suspense } from 'react'
import { AppBar, Box, Button, CircularProgress, Container, MenuItem, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

const PwaUpdates = __APP_TARGET__ === 'pwa' ? lazy(() => import('./PwaUpdates')) : null

export function AppLayout() {
  const { t, i18n } = useTranslation()
  return <>
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mr: 2 }}>Eins<span style={{ color: '#48856c' }}>.</span></Typography>
        <Box component="nav" aria-label={t('navigation')} sx={{ display: 'flex', gap: 1 }}>
          <Button component={Link} to="/" activeProps={{ 'aria-current': 'page' }} activeOptions={{ exact: true }}>{t('home')}</Button>
          <Button component={Link} to="/about" activeProps={{ 'aria-current': 'page' }}>{t('about')}</Button>
        </Box>
        <TextField select size="small" label={t('language')} value={i18n.resolvedLanguage ?? 'en'}
          onChange={(event) => { void i18n.changeLanguage(event.target.value) }}
          sx={{ ml: 'auto', minWidth: 125 }}>
          {languages.map(({ code, label }) => <MenuItem key={code} value={code}>{label}</MenuItem>)}
        </TextField>
      </Toolbar>
    </AppBar>
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 5, md: 9 } }}>
      <Suspense fallback={<Stack sx={{ alignItems: 'center' }}><CircularProgress aria-label={t('loading')} /></Stack>}>
        <Outlet />
      </Suspense>
    </Container>
    {PwaUpdates && <Suspense fallback={null}><PwaUpdates /></Suspense>}
  </>
}
