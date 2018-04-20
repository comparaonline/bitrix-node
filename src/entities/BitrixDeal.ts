import BitrixRestApi, { RequestType } from '../api/BitrixRestApi';

export enum DealsType {
  newSale = 'Nueva venta',
  postSaleService = 'Servicio post venta',
  renewal = 'Renovacion'
}

export enum DealPriority {
  LOW = 48,
  HIGH = 44,
  MEDIUM = 46
}

export class BitrixDeal {

  private bitrixRestApi: BitrixRestApi;

  constructor(bitrixRestApi: BitrixRestApi) {
    this.bitrixRestApi = bitrixRestApi;
  }

  async createDeal(params: any) {
    return await this.bitrixRestApi.callMethod('crm.deal.add', RequestType.POST , params);
  }

  async allDeals(params: any) {
    return await this.bitrixRestApi.callMethod('crm.deal.list', RequestType.GET , params);
  }

  async findDeal(deal: string) {
    return await this.bitrixRestApi.callMethod('crm.deal.get', RequestType.POST , { id: deal });
  }

  async updateDeal(params: any) {
    return await this.bitrixRestApi.callMethod('crm.deal.update', RequestType.POST , params);
  }

  async listFields(params: any) {
    return await this.bitrixRestApi.callMethod('crm.deal.userfield.list', RequestType.GET , params);
  }

  async addUserField(params: any) {
    return await this.bitrixRestApi.callMethod(
      'crm.deal.userfield.add',
      RequestType.POST ,
      params);
  }
}
