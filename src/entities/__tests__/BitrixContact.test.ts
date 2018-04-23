import * as nockUtils from 'nock-utils';
import { expect } from 'chai';
import { BitrixContact } from '../BitrixContact';
import { NEW_CONTACT } from './__mocks__/ContactMocks';
import BitrixRestApi from '../../api/BitrixRestApi';

const bitrixRestApi = BitrixRestApi.getInstance();
const bitrixContact = new BitrixContact(bitrixRestApi);
const FILTER_ID = { select: ['ID'] };

describe('BitrixContact', () => {
  const CASSETTE_PATH = `${__dirname}/cassettes/bitrix-contacts.json`;
  const recorder = new nockUtils.HttpRecorder(CASSETTE_PATH);

  before(() => recorder.start());
  after(() => recorder.stop());

  it('should return all the contacts', async () => {
    const contacts = await bitrixContact.allContacts(FILTER_ID);
    expect(contacts).to.not.be.null;
  });

  it('should create a new contact', async () => {
    const newContact = await bitrixContact.createContact(NEW_CONTACT);
    expect(newContact).to.not.be.null;
  });

  it('should return a contact that exists in Bitrix', async () => {
    const contacts = await bitrixContact.allContacts(FILTER_ID);
    const userId = contacts.result[0].ID;

    const newContact = await bitrixContact.findContact({ id: userId });
    expect(newContact.result.ID).to.equal(userId);
  });

  it('should update a contact in bitrix', async () => {
    const contacts = await bitrixContact.allContacts(FILTER_ID);
    const userId = contacts.result[0].ID;

    const contactParams = { ...NEW_CONTACT, ...{ id: userId } };
    const response = await bitrixContact.updateContact(contactParams);
    expect(response.result).to.eq(true);
  });
});
