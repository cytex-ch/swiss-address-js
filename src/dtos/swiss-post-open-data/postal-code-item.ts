export interface PostalCodeItem {
  rec_art: string;
  onrp: number;
  bfsnr: number;
  plz_typ: number;
  postleitzahl: string;
  plz_zz: string;
  gplz: number;
  ortbez18: string;
  ortbez27: string;
  kanton: string;
  sprachcode: number;
  sprachcode_abw: never;
  briefz_durch: number;
  gilt_ab_dat: string;
  plz_briefzust: number;
  plz_coff: string;
  geo_shape: {
    type: string;
    geometry: {
      coordinates: Array<Array<Array<number>>>;
      type: string;
    };
    properties: {};
  };
  geo_point_2d: {
    lon: number;
    lat: number;
  };
}
