import {AuthenticationApi} from '../../src/apis/auth.api';
import * as config from '../../src/config';

const {username, password} = config;

jest.setTimeout(30000);

describe('AuthenticationApi', () => {
  const api = new AuthenticationApi(username, password);

  test('should be defined', () => {
    expect(api).toBeDefined();
  });
});
