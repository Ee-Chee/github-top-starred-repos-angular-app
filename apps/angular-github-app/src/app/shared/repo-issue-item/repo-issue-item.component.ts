import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../_store/features/repository/repository.models';

@Component({
  selector: 'app-repo-issue-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-issue-item.component.html',
  styleUrl: './repo-issue-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoIssueItemComponent {
  issue = input.required<Issue>();
}
