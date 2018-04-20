import { BitrixConnector } from './BitrixConnector';
import { BitrixCredentials } from './BitrixCredentials';
import * as qs from 'qs';
import * as rest from 'rest';
import { format } from 'util';

const URL = `https://%s.bitrix24.com/rest/%s/%s/%s/?%s`;

export class BitrixWebhook implements BitrixConnector {

  auth: BitrixCredentials;

  constructor (credentials: BitrixCredentials) {
    this.auth = credentials;
  }

  post(method: string, param: any) {
    const request = this.url(method, param);

    return rest({
      path: request,
      method: 'POST'
    });
  }

  private url(method: string, param: any) {
    const str = qs.stringify(param, { encode: false });
    return format(URL, this.auth.url, this.auth.profile, this.auth.secret, method, str);
  }
}
