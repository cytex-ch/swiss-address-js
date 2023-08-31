import {BaseApi} from './base.api';
import {AutoComplete} from '../dtos/address-web-services/autocomplete';
import {
  AutoCompleteQuery,
  AutocompleteRequest,
} from '../dtos/address-web-services/autocomplete-request';

/**
 * @class AutoCompletionApi
 * @description API for retrieving autocomplete suggestions
 */
export class AddressWebservicesApi extends BaseApi {
  constructor() {
    super();
  }

  /**
   * Search zip codes with city which match a given example
   *
   * @method autoComplete
   * @param params {AutocompleteRequest} - The query params for the request
   * @returns {Promise<AutoComplete>} - The letters
   */
  async request(data: AutoCompleteQuery): Promise<AutoComplete> {
    const response = await this.fetch<
      AutocompleteRequest,
      AutoComplete,
      never,
      never,
      'POST'
    >('/autocomplete4', 'POST', undefined, undefined, data.toRequest());

    return response;
  }

  async findTownNameByZipCode(zipCode: string): Promise<string> {
    return this.request(
      new AutoCompleteQuery(null, zipCode, null, null, null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length > 1) {
        throw new Error('More than one result found');
      }
      return response.QueryAutoComplete4Result.AutoCompleteResult[0].TownName;
    });
  }

  async findStreetsByTown(
    query: string,
    zipCode: string,
    townName?: string
  ): Promise<string[]> {
    return this.request(
      new AutoCompleteQuery(query, zipCode, null, null, townName ?? null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      return response.QueryAutoComplete4Result.AutoCompleteResult.map(
        result => result.StreetName
      ).filter(streetName => streetName.length > 0);
    });
  }

  async findZipCodesByTown(
    query: string,
    townName?: string
  ): Promise<string[]> {
    return this.request(
      new AutoCompleteQuery(null, query, null, null, townName ?? null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      return response.QueryAutoComplete4Result.AutoCompleteResult.map(
        result => result.ZipCode
      ).filter(zipCode => zipCode.length > 0);
    });
  }

  async findHouseNumbersByStreet(
    query: string,
    zipCode: string,
    streetName: string,
    townName?: string
  ): Promise<string[]> {
    return this.request(
      new AutoCompleteQuery(streetName, zipCode, query, null, townName ?? null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      return response.QueryAutoComplete4Result.AutoCompleteResult.map(
        result => result.HouseNo
      ).filter(houseNo => houseNo.length > 0);
    });
  }
}
