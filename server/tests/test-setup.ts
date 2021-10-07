import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { MW } from '../middleware';
import { ROUTES } from '../routes';
/* global beforeAll beforeEach afterEach afterAll */
import { seedDatabase } from './seeder';

if (process.env.NODE_ENV !== 'production') dotenv.config();

export const app = express();

app.use(cookieParser());
app.use(MW.deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(0, () => {
  ROUTES.Auth(app);
  ROUTES.Article(app);
  ROUTES.S3(app);
  ROUTES.User(app);
  ROUTES.Admin(app);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if ((error as Error).message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if ((error as Error).message.includes('a background operation is currently running')) return;
      console.log((error as Error).message);
    }
  }
}

export const setupDB = (databaseName: string, runSaveMiddleware = false) => {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb://localhost:2701J/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  // Seeds database before each test
  beforeEach(async () => {
    await seedDatabase(runSaveMiddleware);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
    await server.close();
  });
};
