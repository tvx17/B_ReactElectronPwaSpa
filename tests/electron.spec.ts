import { _electron as electron, expect, test } from '@playwright/test'

test('desktop development loads React Fast Refresh under its CSP', async ({}, testInfo) => {
  const app = await electron.launch({ args: ['.', `--user-data-dir=${testInfo.outputPath('profile')}`], env: { ...process.env, VITE_DEV_SERVER_URL: 'http://127.0.0.1:5173' } })
  try {
    const page = await app.firstWindow()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => '$RefreshReg$' in window)).toBe(true)
  } finally {
    await app.close()
  }
})

test('desktop loads local files, routes, translates and isolates Node', async ({}, testInfo) => {
  const app = await electron.launch({
    executablePath: process.env.ELECTRON_EXECUTABLE,
    args: [...(process.env.ELECTRON_EXECUTABLE ? [] : ['.']), `--user-data-dir=${testInfo.outputPath('profile')}`],
    env: { ...process.env, VITE_DEV_SERVER_URL: '' },
  })
  try {
    const page = await app.firstWindow()
    await expect(page.getByRole('combobox')).toBeVisible()
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.getByRole('combobox').click()
    await page.getByRole('option', { name: 'English', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'One foundation. Every platform.' })).toBeVisible()
    expect(page.url()).toMatch(/^file:/)
    await page.getByRole('link', { name: 'About', exact: true }).click()
    await expect(page).toHaveURL(/#\/about$/)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Built to make it yours.' })).toBeVisible()
    await page.getByRole('combobox', { name: 'Language' }).click()
    await page.getByRole('option', { name: 'Deutsch' }).click()
    await expect(page.getByRole('heading', { name: 'Bereit für deine Ideen.' })).toBeVisible()
    expect(await page.evaluate(() => 'require' in window)).toBe(false)
  } finally {
    await app.close()
  }
})
