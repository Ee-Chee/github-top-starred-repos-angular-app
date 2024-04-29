import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent {}
