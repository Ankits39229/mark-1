const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

// Disable hardware acceleration to prevent GPU-related errors
app.disableHardwareAcceleration();

// Additional command line switches for stability
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-web-security');

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  
  // Calculate window size as percentage of screen (maintaining 3:2 aspect ratio)
  // For 1920x1080: window will be ~1200x800 (62.5% width, 74% height)
  const windowWidth = Math.floor(screenWidth * 0.625);
  const windowHeight = Math.floor(windowWidth * (2/3)); // Maintain 3:2 aspect ratio
  
  // Ensure minimum size constraints
  const finalWidth = Math.max(windowWidth, 800);
  const finalHeight = Math.max(windowHeight, 533);

  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: finalWidth,
    height: finalHeight,
    resizable: false, // Disable resizing
    maximizable: false, // Remove maximize button
    webPreferences: {
      nodeIntegration: false, // Better security practice
      contextIsolation: true, // Better security practice
      preload: path.join(__dirname, 'preload.js'), // Add preload script
      webSecurity: false,
      // Additional stability options
      backgroundThrottling: false
    },
    // Window display options
    show: false, // Don't show until ready
    titleBarStyle: 'hidden', // Hide default title bar for custom implementation
    icon: path.join(__dirname, 'assets/icon.png') // Optional: add an icon
  });

  // Load the index.html of the app
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // IPC handlers for window controls
  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('window-close', () => {
    mainWindow.close();
  });

  // Store reference for IPC handlers
  global.mainWindow = mainWindow;
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window when the dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
