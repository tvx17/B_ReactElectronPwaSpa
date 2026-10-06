import { createHashHistory, createRootRoute, createRoute, createRouter, lazyRouteComponent, Link } from '@tanstack/react-router'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AppLayout } from './components/AppLayout'

function NotFound() {
  const { t } = useTranslation()
  return <Stack spacing={2}><Typography variant="h4">{t('notFound')}</Typography><Link to="/">{t('home')}</Link></Stack>
}

const rootRoute = createRootRoute({ component: AppLayout, notFoundComponent: NotFound })
const homeRoute = createRoute({
  getParentRoute: () => rootRoute, path: '/',
  component: lazyRouteComponent(() => import('./pages/HomePage')),
})
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute, path: '/about',
  component: lazyRouteComponent(() => import('./pages/AboutPage')),
})
export const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute]),
  history: __APP_TARGET__ === 'electron' ? createHashHistory() : undefined,
  defaultPreload: 'intent', scrollRestoration: true,
})
declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}
