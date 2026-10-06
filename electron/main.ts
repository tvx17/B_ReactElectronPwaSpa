import { app, BrowserWindow, session } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const directory = path.dirname(fileURLToPath(import.meta.url))
const developmentUrl = process.env.VITE_DEV_SERVER_URL

async function createWindow() {
  const window = new BrowserWindow({
    width: 1200, height: 800, minWidth: 480, minHeight: 600,
    show: false, backgroundColor: '#f6f7f4',
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true },
  })
  window.once('ready-to-show', () => window.show())
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  window.webContents.on('will-navigate', (event) => event.preventDefault())
  if (!app.isPackaged && developmentUrl) {
    await window.loadURL(developmentUrl)
  } else {
    await window.loadFile(path.join(directory, '../dist/electron/index.html'))
  }
}

app.whenReady().then(async () => {
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false))
  session.defaultSession.setPermissionCheckHandler(() => false)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const development = !app.isPackaged && Boolean(developmentUrl)
    callback({ responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': [
        "default-src 'self'; script-src 'self'" + (development ? " 'unsafe-inline'" : '') +
        "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'" +
        (development ? ' ws://127.0.0.1:5173' : '') + "; object-src 'none'; base-uri 'self'",
      ],
    } })
  })
  await createWindow()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) void createWindow() })
}).catch((error: unknown) => { console.error(error); app.quit() })

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
