import { EntityState } from '@ngrx/entity';
import { Repo } from '../repositories/repositories.model';
import { PageInfo, ResponseErrorInterface } from '@angular-leanix/common';

/**
 * Interface for the 'Repository' data
 */
export interface RepositoryState extends EntityState<RepositoryEntity> {
  loading: boolean;
  error: ResponseErrorInterface | null;
}

export interface RepositoryEntity extends RepoDetail {
  currentPage: string;
  after: string | null;
}

export interface RepoDetail extends Repo {
  nameWithOwner: string;
  createdAt: string;
  updatedAt: string;
  description?: string | null;
  forkCount: number;
  url: string;
  issuesMap: Map<string, Issue[]>;
}

export interface Issues {
  totalCount: number;
  nodes?: Issue[];
  pageInfo?: PageInfo;
}

export interface Issue {
  id: string;
  createdAt: string;
  state: IssueStateEnum;
  title: string;
  url: string;
}

export const firstRepoIssuesPage = 'firstRepoIssuesPage';

export enum IssueStateEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
