import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateRequest from './middleware/validateRequest';
import createUserSchema from './schema/user.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  //Register
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);
  //Login
  //Get the user session
  //Logout
};

export default routes;
