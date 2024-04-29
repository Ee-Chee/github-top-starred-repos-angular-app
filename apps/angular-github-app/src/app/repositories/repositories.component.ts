import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {}
