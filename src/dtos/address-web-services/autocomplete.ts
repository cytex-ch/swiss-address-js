export interface AutoComplete extends Record<string, unknown> {
  QueryAutoComplete4Result: {
    AutoCompleteResult: Array<{
      Canton: string;
      CountryCode: string;
      HouseKey: string;
      HouseNo: string;
      HouseNoAddition: string;
      ONRP: string;
      STRID: string;
      StreetName: string;
      TownName: string;
      ZipAddition: string;
      ZipCode: string;
    }>;
  };
}
