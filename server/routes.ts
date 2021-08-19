import { Express, Request, Response } from 'express';
import validateRequest from './middleware/validateRequest';
import { createUserHandler } from './controller/user.controller';
import { createUserSessionHandler } from './controller/session.controller';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schema/user.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  //Register
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  //Login
  app.post(
    '/api/session',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  //Get the user session
  //Logout
};

export default routes;
