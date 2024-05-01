export interface Search<T> {
  search: {
    nodes: T;
    pageInfo: PageInfo;
  };
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  startCursor?: string;
  hasPreviousPage?: boolean;
}
