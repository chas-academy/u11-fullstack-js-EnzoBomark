import connectToDataBase from './db/connect';
import express from 'express';
import config from 'config';
import cors from 'cors';
import log from './logger';
import routes from './routes';
import { MW } from './middleware';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(MW.deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = config.get('PORT') as number;

const server = app.listen(port, () => {
  log.info(`Server Running On Port ${port}`);

  connectToDataBase();

  routes(app);
});
