import connectToDataBase from './db/connect';
import express from 'express';
import config from 'config';
import log from './logger';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = config.get('PORT') as number;

const server = app.listen(port, () => {
  log.info(`Server Running On Port ${port}`);

  // Connect DB
  connectToDataBase();

  routes(app);
});
