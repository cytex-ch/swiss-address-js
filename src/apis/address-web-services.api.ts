import {AutoComplete} from '../dtos/address-web-services/autocomplete';
import {
  AutoCompleteQuery,
  AutocompleteRequest,
} from '../dtos/address-web-services/autocomplete-request';
import {AddressNotFoundException} from '../exception/address-not-found-exception';
import {BaseApi} from './base.api';
import {Address} from '../types';

/**
 * Swiss Post Address Webservices API
 *
 * @see https://www.post.ch/de/geschaeftsloesungen/digital-commerce/digital-commerce-api/personalisierte-api-integration
 * @class AddressWebservicesApi
 */
export class AddressWebservicesApi extends BaseApi {
  constructor() {
    super();
  }

  /**
   * Generic request method for the Address Webservices API
   *
   * @method autoComplete
   * @param params {AutocompleteRequest} - The query params for the request
   * @returns {Promise<AutoComplete>} The autocomplete response
   */
  async autocompleteRequest(data: AutoCompleteQuery): Promise<AutoComplete> {
    const response = await this.fetch<
      AutocompleteRequest,
      AutoComplete,
      never,
      never,
      'POST'
    >('/autocomplete4', 'POST', undefined, undefined, data.toRequest());

    return response;
  }

  /**
   * Transforms the response from the API to an array of addresses
   *
   * @param response The response from the API
   * @returns The addresses
   * @throws Error if the response is empty
   * @throws Error if the response is invalid
   * @throws Error if the response is missing required fields
   * @throws Error if the response contains invalid fields
   */
  transformResponse(
    response: AutoComplete['QueryAutoComplete4Result']['AutoCompleteResult']
  ): Address[] {
    return response.map(result => {
      const address = new Address();
      address.streetName = result.StreetName;
      address.houseNumber = result.HouseNo;
      address.houseNumberAddition = result.HouseNoAddition;
      address.postalCode = result.ZipCode;
      address.town = result.TownName;
      address.canton = result.Canton;
      address.country = result.CountryCode;

      // Remove empty string
      Object.keys(address).forEach(key => {
        if (address[key as keyof Address] === '') {
          delete address[key as keyof Address];

          return;
        }
      });

      return address;
    });
  }

  /**
   * Find town names by zip code
   *
   * Although one intuitively suspects that there is only one place name per postal code,
   * the assignment is actually not clear. For example, St. Peter (GR) and Pagig have
   * the same postal code (7028).
   *
   * @see https://de.wikipedia.org/wiki/Ortschaftenverzeichnis_der_Schweiz
   *
   * @param zipCode The zip code
   * @returns The town names
   * @throws Error if no results are found
   * @throws Error if the request fails
   */
  async findByPostalCode(zipCode: string): Promise<Address[]> {
    return this.autocompleteRequest(
      new AutoCompleteQuery(null, zipCode, null, null, null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new AddressNotFoundException(
          'Could not find any addresses for the given postal code (' +
            zipCode +
            ')'
        );
      }

      return this.transformResponse(
        response.QueryAutoComplete4Result.AutoCompleteResult
      );
    });
  }

  /**
   * Finds street names by zip code
   *
   * @param zipCode The zip code
   * @returns The street names
   * @throws Error if no results are found
   * @throws Error if the request fails
   */
  async findStreetsByTown(
    zipCode: string,
    townName?: string,
    streetName?: string
  ): Promise<string[]> {
    return this.autocompleteRequest(
      new AutoCompleteQuery(streetName, zipCode, null, null, townName)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      return response.QueryAutoComplete4Result.AutoCompleteResult.map(
        result => result.StreetName
      ).filter(streetName => streetName.length > 0);
    });
  }

  /**
   * Finds addresses by town name
   *
   * Note that some towns have multiple zip codes, such as larger cities,
   * or towns that are spread over several municipalities.
   *
   * @param townName {string} The town name
   * @returns
   */
  async findByTownName(townName: string): Promise<Address[]> {
    return this.autocompleteRequest(
      new AutoCompleteQuery(null, '', null, null, townName ?? null)
    ).then(response => {
      if (response.QueryAutoComplete4Result.AutoCompleteResult.length === 0) {
        throw new Error('No results found');
      }
      return this.transformResponse(
        response.QueryAutoComplete4Result.AutoCompleteResult
      );
    });
  }

  /**
   * Finds house numbers by street name
   *
   * @param query partial house number
   * @param zipCode zip code
   * @param streetName street name
   * @param townName town name
   * @returns house numbers
   */
  async findHouseNumbersByStreet(
    query: string,
    zipCode: string,
    streetName: string,
    townName?: string
  ): Promise<string[]> {
    return this.autocompleteRequest(
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
