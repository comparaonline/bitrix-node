
import * as nockUtils from 'nock-utils';
import { expect } from 'chai';
import { fail } from 'assert';
import BitrixRestApi from '../BitrixRestApi';
import { BitrixContact } from '../../entities/BitrixContact';
import { AuthCache } from '../../auth/AuthCache';

describe('BitrixRestApi', () => {

  const CASSETTE_PATH = `${__dirname}/cassettes/bitrix-rest-api.json`;
  const recorder = new nockUtils.HttpRecorder(CASSETTE_PATH);

  const bitrixRestApi =  BitrixRestApi.getInstance();
  const bitrixContact = new BitrixContact(bitrixRestApi);

  const cache = new AuthCache();

  before(() => {
    cache.clear();
    recorder.start();
  });

  after(() => recorder.stop());

  it('should refresh a missing token', async () => {

    const contacts = await bitrixContact.allContacts({ select: ['ID'] });
    const token = cache.getToken();

    if (token === null) {
      fail('Token must not be null');
    } else {
      expect(token).to.not.be.undefined;
      expect(contacts).to.not.be.empty;
    }
  });

});
