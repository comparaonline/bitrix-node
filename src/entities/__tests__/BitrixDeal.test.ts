import * as nockUtils from 'nock-utils';
import { expect } from 'chai';
import { BitrixDeal } from '../BitrixDeal';
import { NEW_DEAL } from './__mocks__/DealMocks';
import BitrixRestApi from '../../api/BitrixRestApi';

const bitrixRestApi = BitrixRestApi.getInstance();
const deal = new BitrixDeal(bitrixRestApi);

describe('BitrixDeal', () =>  {
  const CASSETTE_PATH = `${__dirname}/cassettes/bitrix-deals.json`;
  const recorder = new nockUtils.HttpRecorder(CASSETTE_PATH);

  before(() => recorder.start());
  after(() => recorder.stop());

  it('should return all the deals in Bitrix', async () => {
    const result = await deal.allDeals({});
    expect(result).not.to.be.null;
  });

  it('should create a new deal in Bitrix', async () => {
    const result = await deal.createDeal(NEW_DEAL);
    expect(result).not.to.be.null;
  });

  it('should return a deal based in its id', async () => {
    const deals = await deal.allDeals({});
    const TITAN_DEAL_ID = deals.result[0].ID;

    const response = await deal.findDeal(TITAN_DEAL_ID);
    expect(response.result.ID).to.eq(TITAN_DEAL_ID);
  });

  it('should update a bitrix deal', async () => {
    const deals = await deal.allDeals({});
    const TITAN_DEAL_ID = deals.result[0].ID;
    const UPDATE_DEAL = { fields: { OPPORTUNITY: 6000 } };
    const dealParams = { ...UPDATE_DEAL, ...{ id: TITAN_DEAL_ID } };
    const response = await deal.updateDeal(dealParams);
    expect(response.result).to.eq(true);
  });
});
