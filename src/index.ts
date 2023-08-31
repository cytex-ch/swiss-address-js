import {AuthenticationApi} from './apis/auth.api';
import {AddressWebservicesApi} from './apis/address-web-services.api';

/**
 * Represents the SwissAddress API.
 */
export default class SwissAddress {
  private autoCompletionApi: AddressWebservicesApi | null = null;
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
    this.autoCompletionApi = new AddressWebservicesApi();
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
    return this.autoCompletionApi as AddressWebservicesApi;
  }
}
