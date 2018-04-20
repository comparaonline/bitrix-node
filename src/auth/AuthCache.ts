import * as datastore from 'node-persist';

const DEFAULT_STORE = 'ResponsysAuthCache.db';

const KEY_TOKEN = 'access_token';
const KEY_REFRESH = 'refresh_token';
const KEY_EXPIRATION = 'expiration_time';

export class AuthCache {

  constructor (dbPath: string = DEFAULT_STORE) {
    datastore.initSync();
  }

  set(authResponse) {
    datastore.setItemSync(KEY_TOKEN, authResponse.token);
    datastore.setItemSync(KEY_REFRESH, authResponse.refresh);
    datastore.setItemSync(KEY_EXPIRATION, authResponse.expiration);
  }

  getToken(): string {
    return datastore.getItemSync(KEY_TOKEN);
  }

  getRefreshToken(): string {
    return datastore.getItemSync(KEY_REFRESH);
  }

  getExpiration(): string {
    return datastore.getItemSync(KEY_EXPIRATION);
  }

  isLoaded(): boolean {
    return this.getToken() != null;
  }

  clear(): void {
    datastore.clearSync();
  }

}
