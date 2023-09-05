var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/router');
var apiRouter = require('./routes/api');
var app = express();

var debug = require('debug')('CS76-1:server');
var http = require('http');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// app.use('/', router);
// app.use('/api', apiRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
  
  // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

var port = process.env.PORT || 3005
app.set('port', port);


 app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 添加路由
app.use('/api', require('./routes/login')); // 替换成您的路由文件路径



//node连接MySQL数据库

const mysql = require ('mysql')
//创建连接
let conn=mysql.createConnection({
    //主机地址
    host:'localhost',
    //用户名
    user:'root',
    //密码
    password:'root',
    //数据库名称
    database:'fortest_db'
})
//获取连接
conn.connect((err)=>{
    if(err) throw err;
    console.log('connected');
})



//result->查询结果
let sql1='select * from user';
conn.query(sql1,(err,result)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log('------------------');  
        console.log(result);
        console.log("查询完成");
        console.log('------------------');  
    }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查询数据库验证用户信息
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('查询数据库错误：', err);
      res.status(500).json({ message: '服务器内部错误' });
      return;
    }

    if (results.length === 1) {
      // 登录成功
      res.status(200).json({ message: '登录成功' });
    } else {
      // 登录失败
      res.status(401).json({ message: '用户名或密码不正确' });
    }
  });
});

module.exports = router;



//关闭数据库连接
// conn.end((err)=>{
//     if (err) throw err;
//     console.log("关闭成功");
// })

//销毁连接 (和关闭连接选择其一)
//conn.destroy();



module.exports = app;