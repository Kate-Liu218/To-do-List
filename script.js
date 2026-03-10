const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('btn');
const todoList = document.getElementById('todo-list');

// 加载任务
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            todoList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = task.completed ? 'todo-item completed' : 'todo-item';
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="btn-group">
                        <button class="finish-btn" data-id="${task.id}">${task.completed ? '恢复' : '完成'}</button>
                        <button class="delete-btn" data-id="${task.id}">删除</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
            // 绑定按钮事件
            bindEvents();
        })
        .catch(error => console.error('Error loading tasks:', error));
}

// 绑定按钮事件
function bindEvents() {
    // 完成/恢复按钮
    document.querySelectorAll('.finish-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const completed = e.target.textContent === '完成';
            fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            })
            .then(() => loadTasks());
        });
    });

    // 删除按钮
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            })
            .then(() => loadTasks());
        });
    });
}

// 添加任务
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText })
    })
    .then(() => {
        todoInput.value = '';
        loadTasks();
    });
}

// 初始加载任务
loadTasks();