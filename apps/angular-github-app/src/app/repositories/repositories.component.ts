import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectRepositoriesData,
  selectRepositoriesError,
  selectRepositoriesLoading,
} from '../_store/features/repositories/repositories.selector';
import {
  navigatePaginatedReposPage,
  requestPaginatedRepos,
  setPaginatedReposError,
} from '../_store/features/repositories/repositories.actions';
import {
  firstReposEntryPage,
  Repo,
} from '../_store/features/repositories/repositories.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../shared/header/header.component';
import { RepoListItemComponent } from '../shared/repo-list-item/repo-list-item.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RefreshButtonComponent } from '../shared/refresh-button/refresh-button.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    RepoListItemComponent,
    PaginationComponent,
    RouterLink,
    MatButtonModule,
    RefreshButtonComponent,
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent implements OnDestroy {
  private store = inject(Store);
  loading$ = this.store.select(selectRepositoriesLoading);
  error$ = this.store.select(selectRepositoriesError);

  reposMap!: Map<string, Repo[]>;
  currentPage?: string;
  repos?: Repo[];
  pagesList!: string[];
  lastAfter: string | null = null; // used in next page request

  constructor() {
    // https://netbasal.com/getting-to-know-the-takeuntildestroyed-operator-in-angular-d965b7263856
    this.store
      .select(selectRepositoriesData)
      .pipe(
        // emit once as reposMap, currentPage, after change
        // loading or error does not emit value
        takeUntilDestroyed()
      )
      .subscribe(({ reposMap, currentPage, after }) => {
        if (reposMap.size === 0) {
          this.store.dispatch(requestPaginatedRepos({ after: currentPage }));
        } else {
          this.reposMap = reposMap;
          this.currentPage = currentPage;
          this.repos = this.reposMap.get(this.currentPage);
          this.pagesList = [...this.reposMap.keys()];
          this.lastAfter = after;
        }
      });

    // never use wholeState here because it emits value whenever loading and error have new values
    // this.store
    //   .select(selectRepositoriesState)
    //   .pipe(
    //     tap(()=> {
    //       console.log('here');
    //     }),
    //     filter((reposMap) => !reposMap.loading && !reposMap.error),
    //     /////
    //   )
  }

  onNextPage() {
    this.store.dispatch(requestPaginatedRepos({ after: this.lastAfter! }));
  }

  onPageNavigation($event: string) {
    this.store.dispatch(navigatePaginatedReposPage({ page: $event }));
  }

  refresh() {
    this.store.dispatch(
      requestPaginatedRepos({ after: this.currentPage ?? firstReposEntryPage })
    );
  }

  resetErr() {
    this.store.dispatch(setPaginatedReposError({ error: null }));
  }

  ngOnDestroy(): void {
    this.resetErr();
  }
}
