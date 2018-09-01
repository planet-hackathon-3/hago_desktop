const {ipcRenderer, shell} = require('electron');

document.addEventListener('click', (event) => {
    if (event.target.id === "save") {
        ipcRenderer.send('set-time', document.getElementById('workTime').value)
    }
});