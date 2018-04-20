import * as request from 'request-promise';
import { format } from 'util';
import * as qs from 'qs';
import { IBitrixRestConnector } from './IBitrixRestConnector';
import * as config from 'config';
import BitrixUrl from './BitrixUrl';
import { AuthCache } from '../auth/AuthCache';

type PromiseRequestObj = {
  uri: string;
  method: RequestType;
  json: boolean;
  body?: any;
};

export enum BitrixErrors {
  TOKEN_EXPIRED = 'expired_token',
  TOKEN_INVALID = 'invalid_token'
}

export enum RequestType {
  GET = 'GET',
  POST = 'POST'
}

export default class BitrixRestApi implements IBitrixRestConnector {

  private static instance: BitrixRestApi;
  private cache = new AuthCache();

  private constructor() { }

  public static getInstance() {
    const newInstance = this.instance || (this.instance = new this());
    return newInstance;
  }

  public async callMethod(methodName: string, requestType: RequestType, params) {
    let response;
    let options;

    try {
      options = this.buildRequestObj(methodName, requestType, params);
      response = await request(options);
    } catch (error) {
      if (this.isExpiredToken(error)) {
        await this.updateToken();
        options = this.buildRequestObj(methodName, requestType, params);
        response = await request(options);
      } else {
        throw error;
      }
    }

    return response;
  }

  private isExpiredToken(message: string) {
    return (message === BitrixErrors.TOKEN_EXPIRED || this.isValidToken(message));
  }

  private isValidToken(error: any) {
    const message = error.error.error;
    const isInvalid = (message === BitrixErrors.TOKEN_INVALID);

    if (isInvalid) {
      this.cache.set({
        refresh: config.get('bitrix.refreshToken')
      });
    }

    return isInvalid;
  }

  private buildRequestObj(methodName: string, requestType: RequestType, params) {
    let options: PromiseRequestObj = {
      uri: this.buildRestApiUrl(methodName, requestType, params),
      method: requestType,
      json: true
    };
    if (requestType === RequestType.POST) {
      options = { ...options, ...{ body: params } };
    }
    return options;
  }

  private buildRestApiUrl(methodName: string, requestType: RequestType, params) {
    let urlParams;

    if (requestType === RequestType.GET) {
      urlParams = qs.stringify(params, { encode: false });
    }

    return format(
      BitrixUrl.REST_URL,
      config.get('bitrix.domain'),
      methodName,
      this.cache.getToken(),
      urlParams ? urlParams : '');
  }

  private buildRefreshTokenUrl() {
    return format(
      BitrixUrl.TOKEN_URL,
      config.get('bitrix.domain'),
      config.get('bitrix.clientId'),
      config.get('bitrix.clientSecret'),
      this.cache.getRefreshToken());
  }

  private async updateToken() {
    const options = { uri: this.buildRefreshTokenUrl(), json: true };
    const response = await request(options);

    this.cache.set({
      token: response.access_token,
      refresh: response.refresh_token,
      expiration: response.expires
    });
  }
}
