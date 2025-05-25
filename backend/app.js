import express from 'express';

const app = express();

app.get('/notes', (req, res) => {
  res.send('this should be the notes');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something's broken!");
});

app.listen(8080, () => {
  console.log('Server is running');
});
