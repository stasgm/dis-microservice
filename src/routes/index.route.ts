import { Router } from 'express';
import { DocumentRoute } from './document.route';
import environnement from '../config/environnement';
import { DocumentStateRoute } from './documentState.route';
import { EntityRoute } from './entity.route';

/**
 * Root api router specifications
 * => API_URL/api/
 */
export class IndexRoute {
  [x: string]: any;
  private api: Router = Router();
  private documentRoute: DocumentRoute;
  private documentStateRoute: DocumentStateRoute;
  private entityRoute: EntityRoute;  

  constructor() {
    this.documentRoute = new DocumentRoute();
    this.documentStateRoute = new DocumentStateRoute();
    this.entityRoute = new EntityRoute();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define index routes
   */
  private routes(): void {
    this.api.get('/', (req, res) => {
      res.json({
        server: 'minskaxd1',
        version: environnement.VERSION,
      });
    });

    this.api.get('/_health', (req, res) => {
      res.sendStatus(200);
    });

    this.api.use('/documents', this.documentRoute.getApi());
    this.api.use('/dis', this.documentStateRoute.getApi());
    this.api.use('/entity', this.entityRoute.getApi());
  }
}
