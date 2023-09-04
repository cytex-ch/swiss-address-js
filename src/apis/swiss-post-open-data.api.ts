import {OpenDataQueryParams} from '../dtos/swiss-post-open-data/open-data-query-params';
import {PostalCodesCollection} from '../dtos/swiss-post-open-data/postal-codes-collection';
import {StreetsCollection} from '../dtos/swiss-post-open-data/streets-collection';
import {
  Address,
  transformBuildingResultItem,
  transformPostalCodeResultItem,
  transformStreetNamesResultItem,
} from '../types';
import {BaseApi} from './base.api';
import {BuildingsCollection} from '../dtos/swiss-post-open-data/buildings-collection';

/**
 * @class SwissPostOpenDataApi
 * @description API for retrieving autocomplete suggestions
 */
export class SwissPostOpenDataApi extends BaseApi {
  constructor() {
    super();
  }

  /**
   * Swiss Post Open Data API is public and does not require authentication.
   *
   * @param path {string} - The path to the resource
   * @param queryParams {OpenDataQueryParams} - The query parameters to include in the URL.
   * @returns {string} The complete URL.
   */
  override url(path: string, queryParams?: object): string {
    const url = new URL(
      'api/explore/v2.1/catalog/datasets/' + path + '/records',
      'https://swisspost.opendatasoft.com'
    );

    Object.entries(queryParams ?? {}).forEach(([key, value]) => {
      url.searchParams.append(key, value as string);
    });

    return url.toString();
  }

  /**
   * Swiss Post Open Data API is public and does not require authentication.
   *
   * @returns {Object} The authorization header.
   * @override
   * @function getAuthorizationHeader
   */
  override getAuthorizationHeader() {
    return {auth: undefined};
  }

  /**
   * Finds a collection of towns that have the given postal code
   *
   * @function findByPostalCode
   * @description Finds addresses by postal code.
   * @param {string} postalCode - The postal code.
   * @returns {Promise<Address[]>} The addresses.
   * @throws Error if the response is empty
   * @throws Error if the response is invalid
   * @throws Error if the response is missing required fields
   */
  async findByPostalCode(postalCode: string): Promise<Address[]> {
    const response = await this.fetch<
      never,
      PostalCodesCollection,
      OpenDataQueryParams,
      never,
      'GET'
    >('plz_verzeichnis_v2', 'GET', {
      where: `postleitzahl="${postalCode}"`,
    });

    return response.results.map(transformPostalCodeResultItem);
  }

  /**
   * Finds a collection of streets lying in the given postal code
   *
   * @param postalCode {string} - The postal code
   * @returns {Promise<Address[]>} The addresses.
   */
  async getStreetNamesByPostalCode(postalCode: string): Promise<Address[]> {
    const address = await this.findByPostalCode(postalCode).then(
      addresses => addresses[0]
    );

    const response = await this.fetch<
      never,
      StreetsCollection,
      OpenDataQueryParams,
      never,
      'GET'
    >('strassenbezeichnungen_v2', 'GET', {
      where: `onrp="${address.onrp}"`,
    });

    return response.results.map(item => {
      return Object.assign(transformStreetNamesResultItem(item), address);
    });
  }

  /**
   * Finds a collection of buildings lying in the given postal code and street name
   *
   * @param postalCode {string} - The postal code
   * @param streetName {string} - The street name
   * @returns {Promise<Address[]>} The addresses.
   * @throws Error if the response is empty
   * @throws Error if the response is invalid
   * @throws Error if the response is missing required fields
   */
  async getStreetByPostalCodeAndStreetName(
    postalCode: string,
    streetName: string
  ): Promise<Address[]> {
    const address = await this.findByPostalCode(postalCode).then(
      addresses => addresses[0]
    );

    const response = await this.fetch<
      never,
      StreetsCollection,
      OpenDataQueryParams,
      never,
      'GET'
    >('strassenbezeichnungen_v2', 'GET', {
      where: `onrp="${address.onrp}" AND strbezk="${streetName}"`,
    });

    return response.results.map(item => {
      return Object.assign(transformStreetNamesResultItem(item), address);
    });
  }

  /**
   * Finds a collection of buildings lying in the given postal code and street name
   *
   * @param postalCode {string} - The postal code
   * @param streetName {string} - The street name
   * @returns {Promise<Address[]>} The addresses.
   * @throws Error if the response is empty
   * @throws Error if the response is invalid
   * @throws Error if the response is missing required fields
   */
  async getBuildingsByPostalCodeAndStreet(
    postalCode: string,
    streetName: string
  ): Promise<Address[]> {
    const street = await this.getStreetByPostalCodeAndStreetName(
      postalCode,
      streetName
    ).then(streets => streets[0]);

    const response = await this.fetch<
      never,
      BuildingsCollection,
      OpenDataQueryParams,
      never,
      'GET'
    >('hausnummer-und-hauskey_v2', 'GET', {
      where: `strid="${street.onrp}"`,
      limit: 100,
    });
    return response.results.map(item => {
      return Object.assign(transformBuildingResultItem(item), street);
    });
  }
}
