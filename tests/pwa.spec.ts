import { expect, test } from '@playwright/test'

test('offline reload, lazy route and another language work after installation', async ({ page, context }) => {
  await page.goto('/')
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve) => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }))
    }
  })
  const manifest = await page.locator('link[rel="manifest"]').getAttribute('href')
  expect(manifest).toBeTruthy()
  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'One foundation. Every platform.' })).toBeVisible()
  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Built to make it yours.' })).toBeVisible()
  await page.getByRole('combobox', { name: 'Language' }).click()
  await page.getByRole('option', { name: 'Deutsch' }).click()
  await expect(page.getByRole('heading', { name: 'Bereit für deine Ideen.' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Bereit für deine Ideen.' })).toBeVisible()
})
