import {AuthenticationApi} from '../../src/apis/auth.api';
import {SwissPostOpenDataApi} from '../../src/apis/swiss-post-open-data.api';
import * as config from '../../src/config';

const {username, password} = config;

jest.setTimeout(30000);

describe('SwissPostOpenDataApi', () => {
  new AuthenticationApi(username, password);
  const api = new SwissPostOpenDataApi();

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  describe('findByPostalCode', () => {
    test('should be defined', () => {
      expect(api.findByPostalCode).toBeDefined();
    });

    test('should return a response', async () => {
      const response = await api.findByPostalCode('6300');
      expect(response).toBeDefined();
    });
  });

  describe('getStreetNamesByPostalCode', () => {
    test('should be defined', () => {
      expect(api.getStreetNamesByPostalCode).toBeDefined();
    });

    test('should return a response', async () => {
      const response = await api.getStreetNamesByPostalCode('9436');
      expect(response).toBeDefined();
    });
  });

  describe('getStreetByPostalCodeAndStreetName', () => {
    test('should be defined', () => {
      expect(api.getStreetByPostalCodeAndStreetName).toBeDefined();
    });

    test('should return a response', async () => {
      const response = await api.getStreetByPostalCodeAndStreetName(
        '9436',
        'Kapfstrasse'
      );

      expect(response).toBeDefined();
      expect(response[0].streetName).toBe('Kapfstrasse');
      expect(response[0].postalCode).toBe('9436');
    });
  });

  describe('getBuildingsByPostalCodeAndStreet', () => {
    test('should be defined', () => {
      expect(api.getBuildingsByPostalCodeAndStreet).toBeDefined();
    });

    test('should return a response', async () => {
      const response = await api.getBuildingsByPostalCodeAndStreet(
        '9435',
        'Gutenbergstrasse'
      );

      expect(response).toBeDefined();
      expect(response[0].streetName).toBe('Gutenbergstrasse');
      expect(response[0].postalCode).toBe('9435');
    });
  });
});
