const express = require('express');
const router = express.Router();

// 处理登录请求
router.post('/', (req, res) => {
  const { email, password } = req.body;
  // 在此处进行验证逻辑，例如查询数据库等
  if (email === 'user' && password === 'password') {
    res.status(200).json({ message: '登录成功' });

    console.log(`拿到了`);
  } else {
    res.status(401).json({ message: '用户名或密码不正确1' });
    console.log(`拿到了`);
  }
});

module.exports = router;
