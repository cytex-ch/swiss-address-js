import {StreetItem} from './street-item';

export interface StreetsCollection {
  total_count: number;
  results: Array<StreetItem>;
}
