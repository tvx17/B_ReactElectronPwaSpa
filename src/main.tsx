import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from '@tanstack/react-router'
import { i18nReady } from './i18n'
import { router } from './router'
import { theme } from './theme'

async function bootstrap() {
  await i18nReady
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>,
  )
}
void bootstrap().catch((error: unknown) => {
  console.error(error)
  document.getElementById('root')!.textContent = 'Unable to start Eins. Please reload the application.'
})
