import { expect } from 'chai';
import { AuthCache } from '../AuthCache';

const DEFAULT = {
  token: 'E9WpDeXSHY5cXKinEHSZUUqclZMbbOutxEBf1b23ieyRpEzltg',
  expiration: 1510880256844,
  refresh: 'dljsdhfkjsdhf87tf8u34ofb879s8nfsldf89ylsdf8lsd89tspd97tsd8'
};

const TEST = {
  token: 'auth-token',
  expiration: 1234567890,
  refresh: 'refresh'
};

describe('AuthCache', () => {

  const authCache = new AuthCache();

  beforeEach(() => {
    authCache.clear();
    authCache.set(DEFAULT);
  });

  it('should set an authentication response', () => {
    authCache.set(TEST);

    expect(authCache.getToken()).to.equal(TEST.token);
    expect(authCache.getRefreshToken()).to.equal(TEST.refresh);
    expect(authCache.getExpiration()).to.equal(TEST.expiration);
  });

  it('should restore an authentication response from cache', () => {
    const token = authCache.getToken();
    expect(token).to.equal(DEFAULT.token);
  });

  it('should restore a previously persisted refresh token', () => {
    const refresh = authCache.getRefreshToken();
    expect(refresh).to.equal(DEFAULT.refresh);
  });

  it('should restore a previously persisted issued date', () => {
    const issued = authCache.getExpiration();
    expect(issued).to.equal(DEFAULT.expiration);
  });

  it('should remove all values from authentication cache', () => {
    authCache.clear();

    expect(authCache.getToken()).to.be.undefined;
    expect(authCache.getRefreshToken()).to.be.undefined;
    expect(authCache.getExpiration()).to.be.undefined;
  });

  it('should return true or false if cache is loaded', () => {
    expect(authCache.isLoaded()).to.be.true;
    authCache.clear();
    expect(authCache.isLoaded()).to.be.false;
  });
});
