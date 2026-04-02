const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 850,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  createMenu()
}

function createMenu() {
  const template = [
    {
      label: '窗口',
      submenu: [
        {
          label: '置顶',
          accelerator: 'Alt+T',
          click: function() {
            const isAlwaysOnTop = win.isAlwaysOnTop()
            win.setAlwaysOnTop(!isAlwaysOnTop)
          }
        },
        {
          type: 'separator'
        },
        {
          label: '退出',
          accelerator: 'Ctrl+Q',
          click: function() {
            app.quit()
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})