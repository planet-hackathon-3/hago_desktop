const {app, Menu, Tray, shell} = require('electron');
// Change config options
const path = require('path');

const NOTIFY_TIME = 10000;
const HAGO_WEB_URL = 'https://www.instagram.com/explore/tags/%EA%B3%A0%EC%96%91%EC%9D%B4/';
app.dock.hide();

const MENU = [
    {}
];

let tray;
let eNotify;

const create_try_app = () => {
    tray = new Tray(`${__dirname}/assets/favicon.jpeg`);
    // const contextMenu = Menu.buildFromTemplate(MENU);
    // tray.setContextMenu(contextMenu);
};

const run_by_notification = () => {

    eNotify.setConfig({
        appIcon: `${__dirname}/assets/notification.jpeg`,
        displayTime: NOTIFY_TIME / 2
    });

    eNotify.notify({ title: 'Hago', text: '고양이 보러 갈 시간', url: HAGO_WEB_URL});
};

app.on('ready', () => {
    eNotify = require('electron-notify');
    create_try_app();
    setInterval(run_by_notification, NOTIFY_TIME);
    // run_by_notification()
});