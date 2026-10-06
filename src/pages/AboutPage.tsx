import { Chip, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()
  return <Stack spacing={3} sx={{ maxWidth: 760 }}>
    <Typography variant="h3" component="h1">{t('aboutTitle')}</Typography>
    <Typography color="text.secondary">{t('aboutDescription')}</Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {['React', 'TypeScript', 'Vite', 'TanStack Router', 'MUI', 'i18next', 'Electron'].map((name) => <Chip key={name} label={name} variant="outlined" />)}
      </Stack>
      <Typography sx={{ mt: 3 }}>{t('translationHint')}</Typography>
    </Paper>
  </Stack>
}
