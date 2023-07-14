function buildDialDOM(minute, second) {
    let block = document.querySelector('.space-empty');
    if (!block.hasChildNodes('dial__input') || block.hasChildNodes('plmodoro-styls') || block.hasChildNodes('task-list')) {
        block.classList.add('dial');
        block.classList.remove('task-list');
        document.querySelector('.task-location').style.display = 'flex';
        document.querySelector('.function-buttons').style.display = 'flex';
        document.querySelector('.function-buttons__container').style.display = 'flex';
        block.innerHTML = `
                	<div class="dial__minute preset-timer">${minute}</div>
                    <p class="dial__separator">:</p>
                    <div class="dial__second preset-timer">${second}</div>
             
        `;
    }
}
