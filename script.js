const todoList = loadTodoList();

const todoInputElement = document.querySelector('.js-todo-name-input');

renderTodoList();

todoInputElement.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
}); //Enter tıkladığımızda da listeye ekleme yapmayı sağlar.

function renderTodoList(){
    const taskList = document.querySelector('.js-tasks-list');

    taskList.innerHTML = ''; 

    for (let i = 0; i < todoList.length; i++) {
        const todoName = todoList[i];

        const innerHtml =
            `<div class="task">
                <p>${todoName}</p>
                <button class="delete-button" 
                onclick="
                    todoList.splice(${i}, 1);
                    saveTodoList();
                    renderTodoList();
                    console.log('A task has been deleted.')"
                >X</button>
            </div>
            `;

        taskList.innerHTML += innerHtml;
    }
}

function addTodo() {
    const todoInputElement = document.querySelector('.js-todo-name-input');
    const todoName = todoInputElement.value.trim();

    if (todoName !== '') {
        todoList.push(todoName);
        todoInputElement.value = '';
        saveTodoList();
        renderTodoList();
        console.log('A new task added to the list.');
    }
}

function clearAll(){
    if (todoList.length > 0) {
        const userConfirm = confirm('Bütün görevleri silmek istediğinize emin misiniz?');

        if (userConfirm) {
            todoList.splice(0, todoList.length);
            saveTodoList();
            renderTodoList();
            console.log('All tasks has been deleted.');
        }
    }
}

function loadTodoList() {
    const savedList = localStorage.getItem('todoList');
    return savedList ? JSON.parse(savedList) : [];
}

function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
