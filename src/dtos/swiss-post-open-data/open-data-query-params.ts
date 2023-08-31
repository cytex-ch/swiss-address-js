export interface OpenDataQueryParams extends Record<string, unknown> {
  where?: string;
  limit?: number;
  offset?: number;
  select?: string;
  order_by?: string;
  group_by?: string;
  refine?: string;
  exclude?: string;
  lang?: string;
  timezone?: string;
}
