import environnement from './environnement';

const swaggerDefinition = {
  basePath: '/',
  host: `${environnement.API_URL}:${environnement.PORT}`,
  info: {
    description: 'minskaxd1 API documentation',
    title: 'minskaxd1',
    version: environnement.VERSION,
  },
  securityDefinitions: {
    bearerAuth: {
      in: 'header',
      name: 'Authorization',
      scheme: 'bearer',
      type: 'apiKey',
    },
  },
};
const swaggerOptions = {
  apis: ['./src/routes/*.ts'],
  swaggerDefinition,
};

export default swaggerOptions;
