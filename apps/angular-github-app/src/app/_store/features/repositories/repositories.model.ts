import { ResponseErrorInterface } from '@angular-leanix/common';

export interface RepositoriesState {
  // starsQuery: StarsQueryEnum;
  paginatedReposMap: Map<string, Repo[]>; // key is after value (used to refresh repos)
  after: string | null; // next page, null if no more next page
  error: ResponseErrorInterface | null;
  loading: boolean;
  currentPage: string;
}

export interface Repo {
  id: string;
  name: string;
  stargazerCount: number;
  owner: {
    login: string;
  };
  issues: {
    totalCount: number;
  };
  primaryLanguage?: {
    name?: string | null;
  } | null;
}

export const firstReposEntryPage = 'firstReposEntryPage';

// export enum StarsQueryEnum {
//   MoreThanZero = '>0',
//   Zero = '0',
// }
