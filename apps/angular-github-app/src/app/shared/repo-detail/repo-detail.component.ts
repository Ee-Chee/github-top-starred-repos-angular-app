import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryEntity } from '../../_store/features/repository/repository.models';

@Component({
  selector: 'app-repo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoDetailComponent {
  repoDetail = input.required<RepositoryEntity>();
}
