export default class BitrixUrl {

  static readonly REST_URL = `https://%s.bitrix24.com/rest/`+
    `%s?parameters_method&auth=%s&%s`;

  static readonly TOKEN_URL = `https://%s.bitrix24.com/oauth/token/`+
      `?grant_type=refresh_token&client_id=%s`+
      `&client_secret=%s&refresh_token=%s`;
}
