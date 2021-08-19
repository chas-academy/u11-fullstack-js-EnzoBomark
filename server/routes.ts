import { Express, Request, Response } from 'express';
import * as MW from './middleware/';
import * as CONT from './controller/';
import * as SCHEMA from './schema/';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  //Register
  app.post(
    '/api/users',
    MW.validateRequest(SCHEMA.createUserSchema),
    CONT.createUserHandler
  );

  //Login
  app.post(
    '/api/sessions',
    MW.validateRequest(SCHEMA.createUserSessionSchema),
    CONT.createUserSessionHandler
  );

  //Get the user session

  //Logout
  app.delete(
    '/api/sessions',
    MW.requireUser,
    CONT.invalidateUserSessionHandler
  );
};

export default routes;
