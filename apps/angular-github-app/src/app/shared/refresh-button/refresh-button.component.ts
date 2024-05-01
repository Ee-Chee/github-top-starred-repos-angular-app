import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './refresh-button.component.html',
  styleUrl: './refresh-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshButtonComponent {
  onRefresh = output();

  refresh() {
    this.onRefresh.emit();
  }
}
