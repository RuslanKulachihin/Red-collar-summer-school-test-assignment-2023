function buildTackDOM() {
    let block = document.querySelector('.space-empty');
    block.classList.remove('dial');
    block.classList.add('task-list');
    document.querySelector('.task-location').style.display = 'none';
    document.querySelector('.function-buttons').style.display = 'none';
    block.innerHTML = `
                <section class="task-list">
                    <div class="task-list__item">
                        <h2 class="task-location__preview-default">Здесь пока нет ваших задач !</h2>
                    </div>
                </section>
        `;
}
