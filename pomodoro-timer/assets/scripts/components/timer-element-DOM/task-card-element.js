function buildTackСardDOM(id, key, numberOrder) {
    const { name, content, status } = id;
    let block = document.querySelector('.task-list__item');
    const task = document.createElement('div');
    task.classList.add('task-cart');
    task.innerHTML += `
		<div class="task-cart__buttoms">
			<button class="task-cart__delete round__bottom-styles task-cart_bottom ">&#x2716</button>
			<button class="task-cart__completed round__bottom-styles task-cart_bottom">&#x2714</button>
		</div>
		<div class="task-cart__parameters">
			<h2 class="task-cart__name">${name}</h2>
			<p class="task__description">${content}</p>
		</div>
		<div class="task-cart__changes">
			<h2 class="task-cart__number round__bottom-styles task-cart_bottom">${numberOrder}</h2>
			<button class="task-cart__change round__bottom-styles task-cart_bottom"><img class="task-cart_img" src="./assets/img/interactive-buttons/change-ico..svg" alt=""></button>
		</div>
	`;
    task.querySelector('.task-cart__delete').addEventListener('click', () => {
        delete Task.allTasks[key];
        localStorage.setItem('allTasks', JSON.stringify(Task.allTasks));
        renderTasksBasedOnStatus();
    });

    task.querySelector('.task-cart__completed').addEventListener('click', () => {
        Task.allTasks[key].status = 2;
        localStorage.setItem('allTasks', JSON.stringify(Task.allTasks));
        renderTasksBasedOnStatus();
    });

    task.querySelector('.task-cart__change').addEventListener('click', () => {
        buildEditTackFormDOM(key);
    });

    block.appendChild(task);

    document.querySelector('.task-location__preview-default').style.display = 'none';
}
