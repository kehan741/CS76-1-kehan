import cors from 'cors';
import express from 'express';

const app = express();
const post = 8000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(post, () =>
  console.log(`Example app listening on port ${post}!`),
);