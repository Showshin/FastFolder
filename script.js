const structureText = document.getElementById('structure');
const pathInput = document.getElementById('path');
const chooseDirBtn = document.getElementById('choose-dir');
const createBtn = document.getElementById('create');
const statusDiv = document.getElementById('status');

chooseDirBtn.addEventListener('click', async () => {
    const path = await window.electronAPI.selectDirectory();
    if (path) {
        pathInput.value = path;
    }
});

createBtn.addEventListener('click', () => {
    const text = structureText.value;
    const basePath = pathInput.value;
    if (!basePath) {
        statusDiv.textContent = 'Vui lòng chọn đường dẫn đích';
        statusDiv.className = 'error';
        return;
    }
    try {
        const tree = parseStructure(text);
        window.electronAPI.createStructure(basePath, tree);
    } catch (error) {
        statusDiv.textContent = 'Lỗi khi phân tích cấu trúc: ' + error.message;
        statusDiv.className = 'error';
    }
});

window.electronAPI.onStructureCreated((event, message) => {
    statusDiv.textContent = message;
    statusDiv.className = message.includes('Lỗi') ? 'error' : '';
});

function parseStructure(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) throw new Error('Cấu trúc rỗng');

    const rootName = lines[0].replace(/\/$/, '').trim();
    const root = { name: rootName, type: 'directory', children: [] };
    const parents = [root];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/^((│   )*)(├── |└── )(.*)$/);
        if (!match) continue;

        const indent = match[1] || '';
        const level = indent.length / 4;
        if (level >= parents.length) {
            throw new Error(`Thụt đầu dòng không hợp lệ tại dòng ${i + 1}`);
        }
        const parent = parents[level];
        const name = match[4].trim();
        const type = name.endsWith('/') ? 'directory' : 'file';
        const nodeName = type === 'directory' ? name.slice(0, -1) : name;
        const node = { name: nodeName, type, children: [] };
        parent.children.push(node);
        if (type === 'directory') {
            parents[level + 1] = node;
        }
    }
    return root;
}