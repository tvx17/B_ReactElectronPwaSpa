import { expect, test } from '@playwright/test'

test('routes, language switching and persistence', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'One foundation. Every platform.' })).toBeVisible()
  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Built to make it yours.' })).toBeVisible()
  await page.getByRole('combobox', { name: 'Language' }).click()
  await page.getByRole('option', { name: 'Deutsch' }).click()
  await expect(page.getByRole('heading', { name: 'Bereit für deine Ideen.' })).toBeVisible()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.getByRole('heading', { name: 'Bereit für deine Ideen.' })).toBeVisible()
})

test('unknown routes have a useful fallback', async ({ page }) => {
  await page.goto('/missing')
  await expect(page.getByText('Page not found')).toBeVisible()
})

test('small screens do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'One foundation. Every platform.' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
