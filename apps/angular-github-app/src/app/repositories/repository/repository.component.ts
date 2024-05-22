import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input as RouteParam,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  navigateRepoPage,
  requestRepo,
  setRepoError,
} from '../../_store/features/repository/repository.actions';
import {
  firstRepoIssuesPage,
  Issue,
  RepositoryEntity,
} from '../../_store/features/repository/repository.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  selectRepositoryEntities,
  selectRepositoryError,
  selectRepositoryLoading,
} from '../../_store/features/repository/repository.selectors';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { RefreshButtonComponent } from '../../shared/refresh-button/refresh-button.component';
import { RouterLink } from '@angular/router';
import { RepoDetailComponent } from '../../shared/repo-detail/repo-detail.component';
import { RepoIssueItemComponent } from '../../shared/repo-issue-item/repo-issue-item.component';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatProgressSpinner,
    PaginationComponent,
    RefreshButtonComponent,
    RouterLink,
    RepoDetailComponent,
    RepoIssueItemComponent,
  ],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent implements OnInit, OnDestroy {
  // withComponentInputBinding()
  // dont use in constructor
  @RouteParam() owner?: string;
  @RouteParam() name?: string;
  // @RouteParam({transform: toRepoObject}) repo?: Repo;

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  loading$ = this.store.select(selectRepositoryLoading);
  error$ = this.store.select(selectRepositoryError);

  repoDetail!: RepositoryEntity;
  issuesMap!: Map<string, Issue[]>;
  currentPage?: string;
  issues?: Issue[];
  pagesList!: string[];
  lastAfter: string | null = null; // used in next page request
  isInitialized = false;

  ngOnInit(): void {
    this.store
      .select(selectRepositoryEntities)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reposDic) => {
        const repositoryEntity = reposDic[`${this.owner}/${this.name}`];
        if (repositoryEntity) {
          this.repoDetail = repositoryEntity;
          this.issuesMap = repositoryEntity.issuesMap;
          this.currentPage = repositoryEntity.currentPage;
          this.issues = this.issuesMap.get(this.currentPage);
          this.pagesList = [...this.issuesMap.keys()];
          this.lastAfter = repositoryEntity.after;
        } else if (!this.isInitialized) {
          this.store.dispatch(
            requestRepo({
              owner: this.owner ?? '',
              name: this.name ?? '',
              after: firstRepoIssuesPage,
            })
          );
        }

        this.isInitialized = true;
      });
  }

  onNextPage() {
    this.store.dispatch(
      requestRepo({
        owner: this.owner ?? '',
        name: this.name ?? '',
        after: this.lastAfter!,
      })
    );
  }

  onPageNavigation($event: string) {
    this.store.dispatch(
      navigateRepoPage({
        page: $event,
        ownerName: this.repoDetail.nameWithOwner,
      })
    );
  }

  refresh() {
    this.store.dispatch(
      requestRepo({
        owner: this.owner ?? '',
        name: this.name ?? '',
        after: this.currentPage ?? firstRepoIssuesPage,
      })
    );
  }

  resetErr() {
    this.store.dispatch(setRepoError({ error: null }));
  }

  ngOnDestroy(): void {
    this.resetErr();
  }
}
