import BitrixRestApi, { RequestType } from '../api/BitrixRestApi';

export class BitrixContact {

  private bitrixRestApi: BitrixRestApi;

  constructor(bitrixRestApi: BitrixRestApi) {
    this.bitrixRestApi = bitrixRestApi;
  }

  async createContact(params: any) {
    return await this.bitrixRestApi.callMethod('crm.contact.add', RequestType.POST, params);
  }

  async findContact(params: any) {
    return await this.bitrixRestApi.callMethod('crm.contact.get', RequestType.POST, params);
  }

  async allContacts(params: any) {
    return await this.bitrixRestApi.callMethod('crm.contact.list', RequestType.GET , params);
  }

  async updateContact(params: any) {
    return await this.bitrixRestApi.callMethod('crm.contact.update', RequestType.POST , params);
  }

  async listFields(params: any) {
    return await this.bitrixRestApi.callMethod(
      'crm.contact.userfield.list',
      RequestType.GET,
      params);
  }

  async addUserField(params: any) {
    return await this.bitrixRestApi.callMethod(
      'crm.contact.userfield.add',
      RequestType.POST ,
      params);
  }

}
