const State = ({ timer, shortRest, longRest, workTasks, completedTasks } = statesTimer);

const itemTimer = new Timer(timer);
itemTimer.runTimerDefault();
const itemShortRest = new Timer(shortRest);
const itemLongRest = new Timer(longRest);

function selectingTimerFunction(elemrnt) {
    switch (elemrnt.target.id) {
        case 'itemTimer':
            selectTimerFunctions();
            break;

        case 'itemTack':
            buildTackDOM();
            Task.creatureTasks(1);
            break;

        case 'itemCompleted':
            buildTackDOM();
            Task.creatureTasks(2);
            break;
    }
}

function selectTimerFunctions() {
    let parent = document.querySelector('.footer__botton');
    let child = parent.querySelector('.on');
    switch (child.id) {
        case 'custom':
            localStorage.setItem('timerConfiguration', 'custom');
            selectTimerStatus();
            break;
        case 'defaulte':
            localStorage.setItem('timerConfiguration', 'default');
            selectTimerStatus();
            break;

        default:
            break;
    }
}

function selectTimerStatus() {
    switch (stateSearch().id) {
        case 'timer':
            itemTimer.runTimerDefault(localStorage.getItem('timerConfiguration'));

            break;
        case 'shortRest':
            itemShortRest.runTimerDefault(localStorage.getItem('timerConfiguration'));

            break;
        case 'longRest':
            itemLongRest.runTimerDefault(localStorage.getItem('timerConfiguration'));

            break;
        case 'pomodoro':
            buildPlmodoroDOM();
            break;

        default:
            break;
    }
}

function stateSearch() {
    let parent = document.querySelector('.timer-states');
    let child = parent.querySelector('.active-button');
    return child;
}
