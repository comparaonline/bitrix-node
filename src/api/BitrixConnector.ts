import { BitrixCredentials } from './BitrixCredentials';

export interface BitrixConnector {

  auth: BitrixCredentials;

  post(method: string, param: any);
}
