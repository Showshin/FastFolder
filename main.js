const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (!result.canceled) {
        return result.filePaths[0];
    } else {
        return null;
    }
});

ipcMain.on('create-structure', (event, basePath, tree) => {
    const fs = require('fs');
    const path = require('path');

    function createNode(currentPath, node) {
        const fullPath = path.join(currentPath, node.name);
        if (node.type === 'directory') {
            fs.mkdirSync(fullPath, { recursive: true });
            for (const child of node.children) {
                createNode(fullPath, child);
            }
        } else {
            fs.writeFileSync(fullPath, '');
        }
    }

    try {
        createNode(basePath, tree);
        event.reply('structure-created', 'Tạo cấu trúc thành công');
    } catch (error) {
        event.reply('structure-created', 'Lỗi khi tạo cấu trúc: ' + error.message);
    }
});