import express from 'express';
import mongoose from 'mongoose';
import { MW } from '../middleware';
import { ROUTES } from '../routes';

export const app = express();
app.use(MW.deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = app.listen(5000, () => {
  ROUTES.S3(app);
  ROUTES.Auth(app);
  ROUTES.Article(app);
  ROUTES.Search(app);
  ROUTES.User(app);
});

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:2701J/JestDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  done();
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close();
  });
  server.close();
  done();
});
