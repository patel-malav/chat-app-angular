import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';

import authentication from './routes/authentication';
import users from './routes/users';

const port = process.env.PORT || 80;

if (process.env.MONGODB) {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.log(chalk`{yellow Message} : {red Data Base Connection Lost}`);
      console.log(err);
      process.exit(1);
    });
}

const app = express();

app.use(express.json());

app.use('/auth', authentication);
app.use('/api/v1/users', users);

app.use((req, resp) => {
  console.log(req.url);
  resp.json({ hello: 'world' });
});

app.use(((err, req, res, next) => {
  console.log('⭕' + err?.message);
  console.log('❌' + err?.code);
  console.log(JSON.stringify(err));
  if (err?.status) {
    return res.status(err.status).json({ error: err.message });
  } else {
    return res.json(err);
  }
}) as ErrorRequestHandler);

const server = app.listen(port, () => {
  console.log(`Server Started @ http://localhost:${port}`);
});

server.once('error', (err) => {
  console.log(chalk`{yellow Message} : {red Connection closed due to error}`);
  console.log(err);
  process.exit(0);
});
