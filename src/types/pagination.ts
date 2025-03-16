/**
 * @interface IPaginatedData
 */
export interface IPaginatedData<T> {
  data: T[];
  links: {
    first?: string | undefined;
    last?: string | undefined;
    prev?: string | undefined;
    next?: string | undefined;
  };
  meta: {
    current_page?: number | undefined;
    from?: number | undefined;
    path?: string | undefined;
    per_page?: number | undefined;
    to?: number | undefined;
  };
}

/**
 * @interface IPaginationParams
 */
export interface IPaginationParams {
  page?: number | undefined;
  paginate?: number | undefined;
}
