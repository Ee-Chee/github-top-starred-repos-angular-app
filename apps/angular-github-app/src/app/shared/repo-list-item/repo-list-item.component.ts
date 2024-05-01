import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repo } from '../../_store/features/repositories/repositories.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repo-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './repo-list-item.component.html',
  styleUrl: './repo-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListItemComponent {
  repo = input.required<Repo>();
  protected readonly JSON = JSON;
}
