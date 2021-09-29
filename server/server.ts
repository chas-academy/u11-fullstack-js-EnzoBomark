if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import connectToDataBase from './db/connect';
import { MW } from './middleware';
import { ROUTES } from './routes';

const port = process.env.PORT;
const origin = {
  origin: process.env.CLIENT_URL as string,
  credentials: true,
};

const app = express();

app.use(cors(origin));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(MW.deserializeUser);

const server = app.listen(port, () => {
  connectToDataBase();
  ROUTES.Auth(app);
  ROUTES.Article(app);
  ROUTES.S3(app);
  ROUTES.Search(app);
  ROUTES.User(app);
  ROUTES.Admin(app);
});
