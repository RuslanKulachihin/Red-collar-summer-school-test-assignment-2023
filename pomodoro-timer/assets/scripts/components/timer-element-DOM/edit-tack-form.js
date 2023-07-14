function buildEditTackFormDOM(key) {
    let block = document.createElement('div');
    block.classList.add('task-form');
    block.innerHTML += `
                    <div class="task-form__input">
                        <label for="nameTask" class="input-description">Введите новое название Задачи:</label>
                        <textarea type="text" id="nameTask" name="name" class="input-string"></textarea>
                        <label for="taskDescription" class="input-description">Введите новое описание к Задаче:</label>
                        <textarea type="text" name="task" rows="5" cols="33" id="taskDescription" class="input-string"></textarea>
                    </div>
					<h2 class="error">Введите имя и описание к задаче !</h2>
                    <div class="task-form__container">
                        <button class="task-form__bottom bottom_cancel on">Отменить &#x2716;</button>
                        <button class="task-form__bottom bottom_save on">Изменить &#x2714;</button>
                    </div>`;

    let div = document.createElement('div');
    div.classList.add('deactivation-functionality');
    document.body.append(block);
    document.body.append(div);

    block.querySelector('.bottom_cancel').addEventListener('click', () => {
        const inputDescription = document.querySelector('#taskDescription');
        const inputName = document.querySelector('#nameTask');
        inputDescription.value = '';
        inputName.value = '';
        block.remove();
        div.remove();
    });

    block.querySelector('.bottom_save').addEventListener('click', () => {
        const inputDescription = document.querySelector('#taskDescription');
        const inputName = document.querySelector('#nameTask');

        if (inputDescription.value != '' && inputName.value != '') {
            Task.editTasks(key, inputName.value, inputDescription.value);
            renderTasksBasedOnStatus();
            inputName.value = '';
            inputDescription.value = '';
            block.remove();
            div.remove();
        } else {
            block.querySelector('.error').classList.add('on-error');
            setTimeout(() => block.querySelector('.error').classList.remove('on-error'), 5000);
        }
    });
}
