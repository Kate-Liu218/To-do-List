const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('btn');
const todoList = document.getElementById('todo-list');

// 事件监听：点击添加按钮
addBtn.addEventListener('click', addTodo);

function addTodo() {
    const taskText = todoInput.value.trim(); // 获取输入框的值并去除两端空白 
    if (taskText === '') return;
    else { // 如果输入不为空 
        const li = document.createElement('li'); // 创建一个新的列表项元素 
        li.className = 'todo-item'; // 设置列表项的类名 
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="btn-group">
                <button class="finish-btn">完成</button>
                <button class="delete-btn">删除</button>
            </div>
        `;
        todoList.appendChild(li); // 将新的列表项添加到任务列表中 
        todoInput.value = ''; // 清空输入框 
        // 将删除按钮的事件监听器移到 else 块内部
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove(); // 删除当前任务项 
        });
        const finishBtn = li.querySelector('.finish-btn');
        function completeTask() {
            li.classList.add('completed'); // 添加完成状态类
            finishBtn.textContent = '恢复'; // 按钮文本更改
            // 移除完成事件，添加恢复事件
            finishBtn.removeEventListener('click', completeTask);
            finishBtn.addEventListener('click', restoreTask);
        }

        // 恢复任务函数
        function restoreTask() {
            li.classList.remove('completed'); // 移除完成状态类
            finishBtn.textContent = '完成'; // 按钮文本改回“完成”
            // 移除恢复事件，添加完成事件
            finishBtn.removeEventListener('click', restoreTask);
            finishBtn.addEventListener('click', completeTask);
        }

        // 初始绑定完成事件
        finishBtn.addEventListener('click', completeTask);
    }
}
