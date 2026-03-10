//启动服务器和处理API请求的代码
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;// 设置服务器端口，这里的端口是3000，如果环境变量中有PORT则使用环境变量中的值

// 中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析 JSON 请求体
app.use(express.static('.')); // 提供静态文件（前端页面）

// API 路由

// 获取所有任务
app.get('/api/tasks', (req, res) => {
    db.getTasks((err, tasks) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(tasks);
    });
});

// 添加任务
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Task text is required' });
        return;
    }
    db.addTask(text, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // 添加后返回所有任务
        db.getTasks((err, tasks) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(tasks);
        });
    });
});

// 更新任务状态
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.updateTaskStatus(id, completed, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // 更新后返回所有任务
        db.getTasks((err, tasks) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(tasks);
        });
    });
});

// 删除任务
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.deleteTask(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // 删除后返回所有任务
        db.getTasks((err, tasks) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(tasks);
        });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});