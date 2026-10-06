import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  return <Stack spacing={5}>
    <Box>
      <Chip label={t('starter')} variant="outlined" color="primary" sx={{ mb: 3 }} />
      <Typography variant="h3" component="h1" sx={{ maxWidth: 760, fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-0.04em' }}>{t('title')}</Typography>
      <Typography color="text.secondary" sx={{ mt: 2, mb: 3, maxWidth: 620, fontSize: '1.15rem' }}>{t('intro')}</Typography>
      <Button component={Link} to="/about" variant="contained" size="large">{t('explore')}</Button>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
      {(['spa', 'pwa', 'electron'] as const).map((target, index) =>
        <Paper key={target} variant="outlined" sx={{ p: 3 }}>
          <Typography color="text.secondary" variant="overline">0{index + 1}</Typography>
          <Stack direction="row" spacing={1} sx={{ my: 1, alignItems: 'center' }}>
            <Typography variant="h6">{t(`targets.${target}.title`)}</Typography>
            {__APP_TARGET__ === target && <Chip size="small" label={t('active')} color="primary" />}
          </Stack>
          <Typography color="text.secondary">{t(`targets.${target}.description`)}</Typography>
        </Paper>)}
    </Box>
  </Stack>
}
