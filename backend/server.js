const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;
const loginRoute = require('./api/login');

app.use(cors({ origin: 'http://localhost:5173' }));
// 将API路由与基本路径关联
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host:'localhost',
    //用户名
    user:'root',
    //密码
    password:'root',
    //数据库名称
    database:'fortest_db'
});

connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败：', err);
    return;
  }
  console.log('数据库连接成功');
});


app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM Users WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('数据库查询出错:', err);
      res.status(500).json({ success: false, message: '服务器内部错误' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ success: true, message: '登录成功' });
      } else {
        res.status(401).json({ success: false, message: '用户名或密码不正确' });
      }
    }
  });

});

// 处理POST请求创建
app.post('/api/create', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO Users (username, email) VALUES (?, ?)';
  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error('插入数据出错:', err);
      res.status(500).json({ success: false, message: '创建记录失败' });
    } else {
      res.status(200).json({ success: true, message: '创建记录成功' });
    }
  });
});

// 处理GET请求获取
app.get('/api/read', (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询数据出错:', err);
      res.status(500).json({ success: false, message: '获取失败' });
    } else {
      res.status(200).json({ success: true, data: results });
    }
  });
});

// 处理PUT请求更新
app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const sql = 'UPDATE Users SET username = ?, email = ? WHERE id = ?';
  db.query(sql, [username, email, id], (err, result) => {
    if (err) {
      console.error('更新数据出错:', err);
      res.status(500).json({ success: false, message: '更新失败' });
    } else {
      res.status(200).json({ success: true, message: '更新成功' });
    }
  });
});

// 处理DELETE请求删除
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('删除数据出错:', err);
      res.status(500).json({ success: false, message: '删除失败' });
    } else {
      res.status(200).json({ success: true, message: '删除成功' });
    }
  });
});

