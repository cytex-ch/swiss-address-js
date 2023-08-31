import {AddressWebservicesApi} from '../../src/apis/address-web-services.api';
import {AuthenticationApi} from '../../src/apis/auth.api';
import * as config from '../../src/config';
import {AutoCompleteQuery} from '../../src/dtos/address-web-services/autocomplete-request';

const {username, password} = config;

jest.setTimeout(30000);

describe('AddressWebservicesApi', () => {
  new AuthenticationApi(username, password);
  const api = new AddressWebservicesApi();

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  describe('request', () => {
    test('should be defined', () => {
      expect(api.request).toBeDefined();
    });

    test('should return a response', async () => {
      const response = await api.request(
        new AutoCompleteQuery('Bahnhofstrasse', null, null, null, 'Heerbrugg')
      );

      expect(response).toBeDefined();
      expect(response).toHaveProperty('QueryAutoComplete4Result');
      expect(response.QueryAutoComplete4Result).toHaveProperty(
        'AutoCompleteResult'
      );
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult
      ).toBeInstanceOf(Array);
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult.length
      ).toBeGreaterThan(0);
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('Canton');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('CountryCode');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('HouseKey');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('HouseNo');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('HouseNoAddition');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('ONRP');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('STRID');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('StreetName');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('TownName');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('ZipAddition');
      expect(
        response.QueryAutoComplete4Result.AutoCompleteResult[0]
      ).toHaveProperty('ZipCode');
    });

    it('should yield the proper town name for a given zip code', async () => {
      await expect(api.findTownNameByZipCode('8000')).resolves.toBe('Zürich');
    });

    it('should throw an error if no results are found', async () => {
      await expect(api.findTownNameByZipCode('9999')).rejects.toThrow(
        'No results found'
      );
    });

    it('should throw an error if more than one result is found', async () => {
      await expect(api.findTownNameByZipCode('800')).rejects.toThrow(
        'More than one result found'
      );
    });

    it('should yield the proper streets for a given zip code and town name', async () => {
      let suggestions = await api.findStreetsByTown('A', '9435', 'Heerbrugg');
      suggestions.forEach(suggestion => {
        expect(suggestion).toMatch(/^A/);
      });
      suggestions = await api.findStreetsByTown('Kanonen', '8004');
      suggestions.forEach(suggestion => {
        expect(suggestion).toMatch(/^Kanonen/);
      });
    });

    it('should throw an error if no results are found', async () => {
      await expect(api.findStreetsByTown('9999', 'Heerbrugg')).rejects.toThrow(
        'No results found'
      );
    });

    it('should yield the proper house numbers for a given zip code, town name and street name', async () => {
      const suggestions = await api.findHouseNumbersByStreet(
        '5',
        '80',
        'Bahnhofstrasse',
        'Zürich'
      );
      suggestions.forEach(suggestion => {
        expect(suggestion).toMatch(/^5/);
      });
    });

    it('should throw an error if no results are found', async () => {
      await expect(
        api.findHouseNumbersByStreet('9999', 'Heerbrugg', 'Bahnhofstrasse')
      ).rejects.toThrow('No results found');
    });

    it('should yield the proper zip codes for a given town name', async () => {
      const suggestions = await api.findZipCodesByTown('8', 'Zürich');
      suggestions.forEach(suggestion => {
        expect(suggestion).toMatch(/^8/);
      });
    });

    it('should throw an error if no results are found', async () => {
      await expect(api.findZipCodesByTown('9999', 'Heerbrugg')).rejects.toThrow(
        'No results found'
      );
    });
  });
});
