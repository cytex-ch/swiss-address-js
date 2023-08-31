export interface AutocompleteRequest extends Record<string, unknown> {
  request: Partial<{
    ONRP: number;
    ZipCode: string;
    ZipAddition: string;
    TownName: string;
    STRID: number;
    StreetName: string;
    HouseKey: number;
    HouseNo: string;
    HouseNoAddition: string;
  }>;

  zipOrderMode: number;
  zipFilterMode: number;
}

export class AutoCompleteQuery {
  streetName!: string | null;
  zipCode!: string | null;
  houseNumber!: string | null;
  houseNumberAddition!: string | null;
  townName!: string | null;

  // istanbul ignore next
  constructor(
    streetName: string | null = null,
    zipCode: string | null = null,
    houseNumber: string | null = null,
    houseNumberAddition: string | null = null,
    townName: string | null = null
  ) {
    this.streetName = streetName;
    this.zipCode = zipCode;
    this.houseNumber = houseNumber;
    this.houseNumberAddition = houseNumberAddition;
    this.townName = townName;
  }

  toRequest(): AutocompleteRequest {
    return {
      request: {
        ONRP: 0,
        ZipCode: this.zipCode ?? '',
        ZipAddition: '',
        TownName: this.townName ?? '',
        STRID: 0,
        StreetName: this.streetName ?? '',
        HouseKey: 0,
        HouseNo: this.houseNumber ?? '',
        HouseNoAddition: this.houseNumberAddition ?? '',
      },
      zipOrderMode: 0,
      zipFilterMode: 0,
    };
  }
}
