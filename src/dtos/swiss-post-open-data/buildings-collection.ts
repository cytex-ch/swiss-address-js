import {BuildingItem} from './building-item';

export interface BuildingsCollection {
  total_count: number;
  results: Array<BuildingItem>;
}
