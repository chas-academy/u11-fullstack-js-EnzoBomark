import { Express, Request, Response } from 'express';

import { ROUTES } from './routes/index';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  ROUTES.Test(app);
  ROUTES.Auth(app);
};

export default routes;
