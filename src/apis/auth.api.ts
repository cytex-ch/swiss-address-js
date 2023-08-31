import {BaseApi} from './base.api';

/**
 * @class AuthenticationApi
 * @description API for authenticating clients
 */
export class AuthenticationApi extends BaseApi {
  constructor(username: string, password: string) {
    super(username, password);
  }
}
