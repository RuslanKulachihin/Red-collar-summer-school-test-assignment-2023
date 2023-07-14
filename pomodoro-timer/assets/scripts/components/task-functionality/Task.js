class Task {
    static allTasks = JSON.parse(localStorage.getItem('allTasks') ?? '{}');
    constructor(name, content, status = 1) {
        this.id = Math.max(0, ...Object.keys(JSON.parse(localStorage.getItem('allTasks') || '{}')).map(Number)) + 1;
        Task.allTasks[this.id] = { name, content, status };
        this.name = name;
        this.content = content;
        this.status = status;
        localStorage.setItem('allTasks', JSON.stringify(Task.allTasks));
    }

    static creatureTasks(statusToRender) {
        let numberOrder = 0;
        for (const key of Object.keys(Task.allTasks)) {
            if (Task.allTasks[key].status === statusToRender) {
                numberOrder++;
                buildTackСardDOM(Task.allTasks[key], key, numberOrder);
            }
        }
    }

    static editTasks(key, name, content) {
        Task.allTasks[key].name = name;
        Task.allTasks[key].content = content;
        localStorage.setItem('allTasks', JSON.stringify(Task.allTasks));
    }
}
