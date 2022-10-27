import { PaginationOptions } from '@domain/interfaces/pagination-options.interface';

export const infinityPagination = <T>(
  data: T[],
  options: PaginationOptions,
) => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
