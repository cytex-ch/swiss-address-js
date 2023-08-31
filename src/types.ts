import {BuildingItem} from './dtos/swiss-post-open-data/building-item';
import {PostalCodeItem} from './dtos/swiss-post-open-data/postal-code-item';
import {StreetItem} from './dtos/swiss-post-open-data/street-item';

export type Type<T> = new (...args: unknown[]) => T;

export class Address {
  streetName?: string;
  houseNumber?: string;
  houseNumberAddition?: string;

  postalCode?: string;
  town?: string;
  canton?: string;
  country?: string;

  geo?: {
    latitude: number;
    longitude: number;
  };

  language?: string;

  onrp?: number;
  strid?: number;
}

export function transformPostalCodeResultItem(item: PostalCodeItem): Address {
  return {
    postalCode: item.postleitzahl,
    town: item.ortbez18,
    canton: item.kanton,
    country: 'Switzerland',
    geo: item?.geo_point_2d && {
      latitude: item.geo_point_2d.lat,
      longitude: item.geo_point_2d.lon,
    },
    language: ['de', 'fr', 'it'][item.sprachcode - 1],
    onrp: item.onrp,
  };
}

export function transformStreetNamesResultItem(item: StreetItem): Address {
  return {
    streetName: item.strbezk,
    strid: item.strid,
  };
}

export function transformBuildingResultItem(item: BuildingItem): Address {
  return {
    houseNumber: item.hnr.toString(),
    houseNumberAddition: item.hnra,
  };
}
