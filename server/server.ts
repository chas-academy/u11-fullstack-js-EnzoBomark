import connectToDataBase from './db/connect';
import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ROUTES } from './routes';
import { MW } from './middleware';

const port = config.get('PORT') as number;
const origin = {
  origin: config.get('CLIENT_URL') as string,
  credentials: true,
};

const app = express();

app.use(cors(origin));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(MW.deserializeUser);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

const server = app.listen(port, () => {
  connectToDataBase();
  ROUTES.Auth(app);
  ROUTES.Article(app);
  ROUTES.S3(app);
  ROUTES.Search(app);
  ROUTES.User(app);
});
