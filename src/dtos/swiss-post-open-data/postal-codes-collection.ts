import {PostalCodeItem} from './postal-code-item';

export interface PostalCodesCollection {
  total_count: number;
  results: Array<PostalCodeItem>;
}
