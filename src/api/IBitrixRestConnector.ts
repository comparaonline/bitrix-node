import { RequestType } from './BitrixRestApi';

export interface IBitrixRestConnector {

  callMethod(methodName: string, requestType: RequestType, requestedBody);
}
