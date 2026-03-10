//初始化数据库并且定义数据函数
const sqlite3 = require('sqlite3').verbose();

// 连接数据库（不存在则创建）
const db = new sqlite3.Database('./todo.db');

// 初始化任务表
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0
        )
    `);
});

// 获取所有任务
function getTasks(callback) {
    db.all('SELECT * FROM tasks', callback);
}

// 添加任务
function addTask(text, callback) {
    db.run('INSERT INTO tasks (text) VALUES (?)', [text], callback);
}

// 更新任务状态（完成/未完成）
function updateTaskStatus(id, completed, callback) {
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], callback);
}

// 删除任务
function deleteTask(id, callback) {
    db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
}

module.exports = {
    getTasks,
    addTask,
    updateTaskStatus,
    deleteTask
};