/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/tslint/config */
import { IConnectionOptions, Factory } from 'gdmn-db';
import environnement from './environnement';

export const driver = Factory.FBDriver;

export const dbOptions: IConnectionOptions = {
  server: { host: environnement.FIREBIRD_HOST, port: environnement.FIREBIRD_PORT },
  path: environnement.FIREBIRD_DATABASE,
  username: environnement.FIREBIRD_USER,
  password: environnement.FIREBIRD_PASSWORD,
};
