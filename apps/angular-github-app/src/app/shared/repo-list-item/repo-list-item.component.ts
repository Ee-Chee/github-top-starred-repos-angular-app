import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repo } from '../../_store/features/repositories/repositories.model';

@Component({
  selector: 'app-repo-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-list-item.component.html',
  styleUrl: './repo-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListItemComponent {
  repo = input.required<Repo>();
}
