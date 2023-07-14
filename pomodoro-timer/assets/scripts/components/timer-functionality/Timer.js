class Timer {
    static originaSecond = this.timeLine;

    constructor({ timeLine, dialMinute, dialSecond, background } = State) {
        this.timeLine = timeLine;
        this.dialMinute = dialMinute;
        this.dialSecond = dialSecond;
        this.background = background;
    }
    runTimerDefault() {
        if (localStorage.getItem('timerConfiguration') === 'default') {
            localStorage.removeItem('interval');
            localStorage.setItem('interval', this.timeLine);
            buildDialDOM(this.dialMinute, this.dialSecond);
        } else {
            localStorage.removeItem('timer');
            localStorage.setItem('timer', localStorage.getItem('timerDefault'));
            localStorage.removeItem('shortRest');
            localStorage.setItem('shortRest', localStorage.getItem('shortRestDefault'));
            localStorage.removeItem('longRest');
            localStorage.setItem('longRest', localStorage.getItem('longRestDefault'));
            buildDialInputDOM(url);
        }
        clearInterval(this.Time);
    }

    static runTimerСustom() {
        let url = location.href.match('(?<=#).*').join('');
        localStorage.getItem(url);
    }

    static startTimer(inactiveTimer) {
        this.setTimer = setInterval(() => {
            let minets, second;
            let currentUrl = getUrl();
            let timerHasEnded;
            if (localStorage.getItem('timerConfiguration') === 'default') {
                let interval = localStorage.getItem('interval');
                minets = Math.floor(interval / 60);
                second = interval % 60;
                minets = minets < 10 ? `0${+minets}` : minets;
                second = second < 10 ? `0${+second}` : second;
                buildDialDOM(minets, second);
                interval--;
                localStorage.setItem('interval', interval);
                timerHasEnded = interval <= 0;
            } else {
                [minets, second] = getTimeBasedOnUrl();
                buildDialInputDOM();
                localStorage.setItem(currentUrl, +minets * 60 + +second - 1);
                timerHasEnded = +minets * 60 + +second <= 0;
            }

            if (timerHasEnded) {
                clearInterval(this.setTimer);
                if (currentUrl === 'timer' && PomodoroCounter.getPomodoroCount() > 1) {
                    document.querySelector('#timer').classList.remove('active-button');
                    document.querySelector('#shortRest').classList.add('active-button');
                    url('shortRest');
                    selectTimerFunctions();
                    Timer.startTimer(inactiveTimer);
                }

                if (currentUrl === 'timer' && PomodoroCounter.getPomodoroCount() <= 1) {
                    document.querySelector('#timer').classList.remove('active-button');
                    document.querySelector('#longRest').classList.add('active-button');
                    url('longRest');
                    selectTimerFunctions();
                    Timer.startTimer(inactiveTimer);
                }

                if (currentUrl === 'longRest') {
                    document.querySelector('#longRest').classList.remove('active-button');
                    document.querySelector('#pomodoro').classList.add('active-button');
                    url('pomodoro');
                    selectTimerFunctions();
                    PomodoroCounter.decrementPomodoroCount();
                    PomodoroCounter.storePomodoroDefaultCountFromInput();
                    Timer.stopTimer(inactiveTimer);
                }

                if (currentUrl === 'shortRest') {
                    document.querySelector('#shortRest').classList.remove('active-button');
                    document.querySelector('#timer').classList.add('active-button');
                    url('timer');
                    selectTimerFunctions();
                    PomodoroCounter.decrementPomodoroCount();
                    Timer.startTimer(inactiveTimer);
                }
            }
        }, 1000);

        inactiveTimer.parentNode.querySelectorAll('.on').forEach((el) => {
            el.classList.remove('on');
            el.classList.add('off');
        });
        inactiveTimer.textContent = 'Остановить таймер !';
    }

    static stopTimer(activeTimer) {
        clearInterval(this.setTimer);
        activeTimer.parentNode.querySelectorAll('.off').forEach((el) => {
            el.classList.add('on');
            el.classList.remove('off');
        });
        activeTimer.textContent = 'Запустить таймер !';
    }
    static restartTimer() {
        Timer.stopTimer(document.querySelector('.active-timer'));
        selectTimerFunctions();
    }
    static timeAssignment(dialMinute, dialSecond) {
        let minute = document.querySelector('.dial__minute');
        let second = document.querySelector('.dial__second');
        minute.value.innerHTML(dialMinute);
        second.value.innerHTML(dialSecond);
    }
}
