function buildPlmodoroDOM() {
    let block = document.querySelector('.space-empty');
    block.classList.add('dial');
    block.classList.remove('task-list');
    document.querySelector('.task-location').style.display = 'flex';
    document.querySelector('.function-buttons').style.display = 'flex';
    document.querySelector('.function-buttons__container').style.display = 'none';

    block.innerHTML = `
                    <input type="number" min="0" max="999" id="pomodoroInput" class="dial__minute dial__input plmodoro-styls"  value="${PomodoroCounter.getPomodoroDefaultCount()}" />
        `;
    block.querySelector('input').addEventListener('input', () => PomodoroCounter.storePomodoroDefaultCountFromInput());
}
