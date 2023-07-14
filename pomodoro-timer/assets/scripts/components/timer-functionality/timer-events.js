url("timer", "");

function buildTimer() {
    document.querySelectorAll(".tack-menu").forEach((event) => {
        event.addEventListener("click", (event) => {
            let parent = document.querySelector(".timer-states");
            if (
                event.target.classList.contains("active-button") == false &&
                event.target.className !== "tack-menu" &&
                event.target.className !== "timer-states"
            ) {
                event.target.parentNode
                    .querySelectorAll(".active-button")
                    .forEach((el) => {
                        el.classList.remove("active-button");
                    });
                event.target.classList.add("active-button");

                if (parent == event.target.parentNode) {
                    url(event.target.id, event.target.parentNode);
                    selectTimerFunctions();
                }
                selectingTimerFunction(event);
            }
        });
    });
}

buildTimer();

function startStopFuntion() {
    document
        .querySelector(".active-timer")
        .addEventListener("click", (event) => {
            event.target.classList.contains("on")
                ? Timer.startTimer(event.target)
                : Timer.stopTimer(event.target);
        });
}

startStopFuntion();

if (localStorage.getItem("timerDefault") === null) {
    localStorage.setItem("timerDefault", 600);
}

if (localStorage.getItem("shortRestDefault") === null) {
    localStorage.setItem("shortRestDefault", 300);
}

if (localStorage.getItem("longRestDefault") === null) {
    localStorage.setItem("longRestDefault", 900);
}

if (localStorage.getItem("timerConfiguration") === null) {
    localStorage.setItem("timerConfiguration", "custom");
}

document
    .querySelector(".timer-restart")
    .addEventListener("click", () => Timer.restartTimer());

document
    .querySelector(".tack-menu__button-create-tack")
    .addEventListener("click", () => {
        buildInputTackFormDOM();
    });

if (localStorage.getItem("timerConfiguration") === "default") {
    document.getElementById("defaulte").classList.add("on");
    document.getElementById("custom").classList.remove("on");
}

if (localStorage.getItem("timerConfiguration") === "custom") {
    document.getElementById("defaulte").classList.remove("on");
    document.getElementById("custom").classList.add("on");
}

document.querySelectorAll(".footer__botton").forEach((event) => {
    event.addEventListener("click", (event) => {
        if (
            event.target.classList.contains("on") == false &&
            event.target.className !== "footer__botton" &&
            event.target.classList.contains("tack-menu__button") == true
        ) {
            event.target.parentNode.querySelectorAll(".on").forEach((el) => {
                el.classList.remove("on");
            });
            event.target.classList.add("on");
            selectTimerFunctions();
        }
    });
});

function url(url) {
    location.href = window.location.pathname + "#" + url;

    //localStorage.removeItem(url);
    //  localStorage.setI(url);
}

function getUrl() {
    return location.href.match("(?<=#).*").join("");
}

function getTimeBasedOnUrl() {
    const localStorageValue = localStorage.getItem(getUrl()) ?? 0;
    const minutes = Math.floor(localStorageValue / 60);
    const seconds = localStorageValue % 60;
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");
    return [minutesString, secondsString];
}

function renderTasksBasedOnStatus() {
    buildTackDOM();
    const whetherOnItemTack = Array.of(
        ...document.querySelectorAll(".active-button")
    ).some((element) => element.id === "itemTack");
    const whetherOnItemCompleted = Array.of(
        ...document.querySelectorAll(".active-button")
    ).some((element) => element.id === "itemCompleted");
    const status = whetherOnItemCompleted ? 2 : whetherOnItemTack ? 1 : 0;
    Task.creatureTasks(status);
}

class PomodoroCounter {
    static ID = "pomodoroInput";
    static ID_DEFAULT = "pomodoroInputDefault";
    static DEFAULT_VALUE = 1;

    static getPomodoroCount() {
        try {
            return (
                localStorage.getItem(PomodoroCounter.ID) ||
                PomodoroCounter.DEFAULT_VALUE
            );
        } catch (e) {
            return PomodoroCounter.DEFAULT_VALUE;
        }
    }

    static getPomodoroDefaultCount() {
        try {
            return (
                localStorage.getItem(PomodoroCounter.ID_DEFAULT) ||
                PomodoroCounter.DEFAULT_VALUE
            );
        } catch (e) {
            return PomodoroCounter.DEFAULT_VALUE;
        }
    }

    static decrementPomodoroCount() {
        localStorage.setItem(
            PomodoroCounter.ID,
            +localStorage.getItem(PomodoroCounter.ID) - 1
        );
    }

    static storePomodoroDefaultCountFromInput() {
        const pomodoroInput = document.getElementById(PomodoroCounter.ID);
        const valueToStore =
            pomodoroInput?.value || PomodoroCounter.DEFAULT_VALUE;
        localStorage.setItem(PomodoroCounter.ID_DEFAULT, valueToStore);
        localStorage.setItem(PomodoroCounter.ID, valueToStore);
    }
}
