import { Request } from 'express';

export interface PaginationOptions {
  page?: string;
  limit?: string;
}

export interface PaginationResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface SearchOptions {
  [key: string]: {
    type: 'string' | 'number' | 'boolean';
    field: string;
    regex?: boolean;
  };
}

export const getPaginationOptions = (req: Request): { skip: number; limit: number; page: number } => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  return { skip, limit, page };
};

export const buildSearchQuery = <T>(req: Request, searchOptions: SearchOptions): Partial<T> => {
  const searchQuery: any = {};

  Object.entries(searchOptions).forEach(([queryParam, options]) => {
    const value = req.query[queryParam];
    if (value !== undefined) {
      switch (options.type) {
        case 'string':
          searchQuery[options.field] = options.regex 
            ? { $regex: value, $options: 'i' }
            : value;
          break;
        case 'number':
          searchQuery[options.field] = parseFloat(value as string);
          break;
        case 'boolean':
          searchQuery[options.field] = value === 'true';
          break;
      }
    }
  });

  return searchQuery;
};

export const createPaginationResult = <T>(
  docs: T[],
  total: number,
  { page, limit }: { page: number; limit: number }
): PaginationResult<T> => {
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  return {
    docs,
    totalDocs: total,
    limit,
    page,
    totalPages,
    pagingCounter: skip + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };
};