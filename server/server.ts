import connectToDataBase from './db/connect';
import express from 'express';
import config from 'config';
import cors from 'cors';
import { ROUTES } from './routes';
import { MW } from './middleware';

const app = express();

app.use(
  cors({
    origin: config.get('CLIENT_URL') as string,
  })
);

app.use(MW.deserializeUser);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const port = config.get('PORT') as number;

const server = app.listen(port, () => {
  connectToDataBase();
  ROUTES.Test(app);
  ROUTES.Auth(app);
  ROUTES.S3(app);
});
