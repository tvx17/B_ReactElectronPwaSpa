import { Alert, Button, Snackbar } from '@mui/material'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useTranslation } from 'react-i18next'

export default function PwaUpdates() {
  const { t } = useTranslation()
  const { needRefresh: [needRefresh, setNeedRefresh], offlineReady: [offlineReady, setOfflineReady], updateServiceWorker } = useRegisterSW({
    onRegisterError(error) { console.error('Service worker registration failed', error) },
  })
  const close = () => { setNeedRefresh(false); setOfflineReady(false) }
  return <Snackbar open={needRefresh || offlineReady} onClose={close}>
    <Alert severity="info" onClose={close} action={needRefresh
      ? <Button color="inherit" onClick={() => { void updateServiceWorker(true) }}>{t('reload')}</Button>
      : undefined}>
      {t(needRefresh ? 'updateAvailable' : 'offlineReady')}
    </Alert>
  </Snackbar>
}
