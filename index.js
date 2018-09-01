const {app, Menu, Tray, shell} = require('electron');
// Change config options
const path = require('path');
const moment = require('moment');

const NOTIFY_TIME = "00:10";
const HAGO_WEB_URL = 'https://www.instagram.com/explore/tags/%EA%B3%A0%EC%96%91%EC%9D%B4/';
app.dock.hide();

const MENU = [
    {label: 'Start', click () {turn_on_off(false)}},
    {label: '냥이사진보기', click () { shell.openExternal(HAGO_WEB_URL)}},
    {label: 'Exit', click () { app.quit() }}
];

let tray;
let eNotify;
let contextMenu;
let menuBarNameTimeIntervalFn;
let time;
let batchFlag = false;

const reset_time = () => {
    time = new Date().setHours(0, 0, 0, 0);
};

const create_try_app = () => {
    contextMenu = Menu.buildFromTemplate(MENU);
    tray = new Tray(`${__dirname}/assets/favicon.jpeg`);
    tray.setContextMenu(contextMenu);
};

const run_by_notification = () => {
    const COPY_MENU = MENU;
    if (moment(time).format("mm:ss") === NOTIFY_TIME && !batchFlag) {
        batchFlag = true;
        eNotify.setConfig({
            appIcon: `${__dirname}/assets/notification.jpeg`,
            displayTime: 5000
        });
        eNotify.notify({ title: 'Hago', text: '고양이 보러 갈 시간', url: HAGO_WEB_URL});
        COPY_MENU[0].label = 'Repeat';
        COPY_MENU[0].click = () => turn_on_off(false);
        clearInterval(menuBarNameTimeIntervalFn);
        reset_time();
        tray.setContextMenu(Menu.buildFromTemplate(COPY_MENU));
    }
};

const turn_on_off = (turn) => {

    const COPY_MENU = MENU;

    if (turn) {
        COPY_MENU[0].label = 'Start';
        COPY_MENU[0].click = () => turn_on_off(false);
        clearInterval(menuBarNameTimeIntervalFn);
        reset_time();
        tray.setTitle('');
    } else {
        COPY_MENU[0].label = 'Stop';
        COPY_MENU[0].click = () => turn_on_off(true);
        menuBarNameTimeIntervalFn = setInterval(()=> {
            if (!time) reset_time();
            time = moment(time).add(1, 's');
            tray.setTitle(time.format('mm:ss'));
        }, 1000);
    }

    tray.setContextMenu(Menu.buildFromTemplate(COPY_MENU));
};

app.on('ready', () => {
    eNotify = require('electron-notify');
    create_try_app();
    setInterval(run_by_notification, 500);
    // run_by_notification()
});