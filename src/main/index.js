import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { updateHandle } from '../renderer/utils/Update.js'
import devConfig from '../../config/dev.env.js'
import prodConfig from '../../config/prod.env.js'
const Store = require('electron-store')
const estore = new Store()
// const log = require('electron-log')

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null) // 取消菜单栏
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1050,
    //   frame: false, // 是否隐藏标题栏
    webPreferences: {// 设置允许跨域
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
    estore.set('initLogin', '')
  })

  mainWindow.on('resize', () => {
    mainWindow.webContents.send('window_move')
  })
  ipcMain.on('show-window', () => {
    mainWindow.maximize()
  })

  ipcMain.on('min-window', () => {
    mainWindow.minimize()
  })

  ipcMain.on('close-window', () => {
    mainWindow.close()
    estore.set('initLogin', '')
  })

  ipcMain.on('un-maximize', () => {
    mainWindow.unmaximize()
  })

  ipcMain.on('un-on-maximize', (event, message) => {
    let result = ''
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
      result = 'unmaximize'
    } else {
      mainWindow.maximize()
      result = 'maximize'
    }
    event.sender.send('asynchronous-reply', result)
  })
  // 窗口取消最大化
  ipcMain.on(mainWindow.unmaximize, () => {
    window.unmaximize()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  // 检测版本更新
  if (process.env.NODE_ENV === 'production') {
    let feedUrl = process.env.NODE_ENV === 'development' ? devConfig.VUE_BUILD_PUBLISH_URL : prodConfig.VUE_BUILD_PUBLISH_URL
    var regExp = new RegExp('"', 'g')
    if (feedUrl) {
      feedUrl = feedUrl.replace(regExp, '')
      updateHandle(mainWindow, feedUrl)
    }
  }
})
