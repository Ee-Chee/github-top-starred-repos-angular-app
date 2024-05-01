import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectRepositoriesError,
  selectRepositoriesLoading,
  selectRepositoriesState,
} from '../_store/features/repositories/repositories.selector';
import { filter, tap } from 'rxjs';
import {
  navigatePaginatedReposPage,
  requestPaginatedRepos,
} from '../_store/features/repositories/repositories.actions';
import { Repo } from '../_store/features/repositories/repositories.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../shared/header/header.component';
import { RepoListItemComponent } from '../shared/repo-list-item/repo-list-item.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  private store = inject(Store);
  loading$ = this.store.select(selectRepositoriesLoading);
  error$ = this.store.select(selectRepositoriesError);

  reposMap!: Map<string, Repo[]>;
  currentPage!: string;
  repos?: Repo[];
  pagesList!: string[];
  lastAfter: string | null = null; // used in next page request

  constructor() {
    // https://netbasal.com/getting-to-know-the-takeuntildestroyed-operator-in-angular-d965b7263856
    this.store
      .select(selectRepositoriesState)
      .pipe(
        filter((reposMap) => !reposMap.loading && !reposMap.error),
        tap((reposMap) => {
          if (reposMap.paginatedReposMap.size === 0) {
            this.store.dispatch(
              requestPaginatedRepos({ after: reposMap.currentPage })
            );
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (reposMap) => {
          this.reposMap = reposMap.paginatedReposMap;
          this.currentPage = reposMap.currentPage;
          this.repos = this.reposMap.get(this.currentPage);
          this.pagesList = [...this.reposMap.keys()];
          this.lastAfter = reposMap.after;
        },
      });
  }

  onNextPage() {
    this.store.dispatch(requestPaginatedRepos({ after: this.lastAfter! }));
  }

  onPageNavigation($event: string) {
    this.store.dispatch(navigatePaginatedReposPage({ page: $event }));
  }

  refresh() {
    this.store.dispatch(requestPaginatedRepos({ after: this.currentPage }));
  }
}
