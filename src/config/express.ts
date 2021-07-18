import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import swagger from './swagger';

// Create Express server
const app = express();
const swaggerSpec = swaggerJsdoc(swagger);
const swaggerUiHandler = swaggerUiExpress.setup(swaggerSpec);
const docsJsonPath = '/api-docs.json';

app.use((req: Request, res: Response, next: NextFunction) => {
  delete req.headers['content-encoding'];
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// swagger Documentation
app.get(docsJsonPath, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUiExpress.serve, (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.url) {
    res.redirect(`/docs?url=${req.protocol}://${req.headers.host}${docsJsonPath}`);
  } else {
    swaggerUiHandler(req, res, next);
  }
});

export default app;
