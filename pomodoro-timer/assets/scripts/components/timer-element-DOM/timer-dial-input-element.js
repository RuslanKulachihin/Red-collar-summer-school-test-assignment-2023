function buildDialInputDOM() {
    let block = document.querySelector('.space-empty');
    if (!block.hasChildNodes('dial__input') || block.hasChildNodes('plmodoro-styls')) {
        block.classList.add('dial');
        block.classList.remove('task-list');
        document.querySelector('.task-location').style.display = 'flex';
        document.querySelector('.function-buttons').style.display = 'flex';
        document.querySelector('.function-buttons__container').style.display = 'flex';

        block.innerHTML = `
                    <input type="number" class="dial__minute dial__input " min="0" max="999" value="${getTimeBasedOnUrl()[0]}"  />
                    <p class="dial__separator">:</p>
                    <input  type="number" class="dial__second dial__input" min="0" max="999" value="${getTimeBasedOnUrl()[1]}" />
        `;
    }

    let url = getUrl();
    let key = url + 'Default';

    document.querySelector('.dial__minute').addEventListener('input', (minute) => {
        console.log(key, minute.target.value * 60);
        if (+minute.target.value <= 0) {
            minute.target.value = 0;
        } else if (+minute.target.value >= 999) {
            minute.target.value = 999;
        }
        localStorage.setItem(key, +minute.target.value * 60 + +document.querySelector('.dial__second').value);
        localStorage.setItem(url, +minute.target.value * 60 + +document.querySelector('.dial__second').value);
    });
    document.querySelector('.dial__second').addEventListener('input', (second) => {
        if (+second.target.value <= 0) {
            second.target.value = 0;
        } else if (+second.target.value >= 59) {
            second.target.value = 59;
        }
        localStorage.setItem(key, +second.target.value + +document.querySelector('.dial__minute').value * 60);

        localStorage.setItem(url, +second.target.value + +document.querySelector('.dial__minute').value * 60);
        console.log(key, localStorage.getItem(key));
    });
}
