import * as express from 'express';
import { Request, Response, Router } from 'express';
import { json, urlencoded } from 'body-parser';
import * as helmet from 'helmet';

export function getApp() {
  const app = express();

  app.use(urlencoded( { extended: false }));
  app.use(json());
  app.use(helmet());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

  // Setup endpoints
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/app');
  });

  app.use('/app', express.static('./client'));
  app.use('/app/*', express.static('./client'));

  const apiRouter: Router = Router();
  app.use('/api', apiRouter);
  apiRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).send('API Running');
  });

  return app;
}