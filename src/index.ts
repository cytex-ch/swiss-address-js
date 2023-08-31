import {AddressWebservicesApi} from './apis/address-web-services.api';
import {AuthenticationApi} from './apis/auth.api';
import {SwissPostOpenDataApi} from './apis/swiss-post-open-data.api';

/**
 * Represents the SwissAddress API.
 */
export default class SwissAddress {
  private swissPostOpenDataApi: SwissPostOpenDataApi | null = null;
  private addressWebservicesApi: AddressWebservicesApi | null = null;
  private authenticationApi: AuthenticationApi | null = null;

  /**
   * Constructs a new SwissAddress instance.
   *
   * @param {string} username - The username for the SwissAddress API.
   * @param {string} password - The password for the SwissAddress API.
   */
  constructor(
    private username: string,
    private password: string
  ) {
    this.init();
  }

  /**
   * Initializes the AuthenticationApi and LetterboxApi instances.
   * @private
   */
  public init(): void {
    this.authenticationApi = new AuthenticationApi(
      this.username,
      this.password
    );
    this.addressWebservicesApi = new AddressWebservicesApi();
    this.swissPostOpenDataApi = new SwissPostOpenDataApi();
  }

  /**
   * Gets the AuthenticationApi instance.
   * @public
   * @returns {AuthenticationApi} The AuthenticationApi instance.
   */
  public get user(): AuthenticationApi {
    return this.authenticationApi as AuthenticationApi;
  }

  /**
   * Gets the AddressWebservicesApi instance.
   *
   * @public
   * @returns {AddressWebservicesApi} The AddressWebservicesApi instance.
   */
  public get addresses(): AddressWebservicesApi {
    return this.addressWebservicesApi as AddressWebservicesApi;
  }

  /**
   * Gets the SwissPostOpenDataApi instance.
   *
   * @public
   * @returns {SwissPostOpenDataApi} The SwissPostOpenDataApi instance.
   */
  public get swissPostOpenData(): SwissPostOpenDataApi {
    return this.swissPostOpenDataApi as SwissPostOpenDataApi;
  }
}
