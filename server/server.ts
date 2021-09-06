import connectToDataBase from './db/connect';
import express from 'express';
import config from 'config';
import cors from 'cors';
import { ROUTES } from './routes';
import { MW } from './middleware';

const port = config.get('PORT') as number;
const origin = { origin: config.get('CLIENT_URL') as string };

const app = express();

app.use(cors(origin));
app.use(MW.deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(port, () => {
  connectToDataBase();
  ROUTES.Auth(app);
  ROUTES.Article(app);
  ROUTES.S3(app);
});
