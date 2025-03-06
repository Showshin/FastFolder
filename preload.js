const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    createStructure: (basePath, tree) => ipcRenderer.send('create-structure', basePath, tree),
    onStructureCreated: (callback) => ipcRenderer.on('structure-created', callback)
});