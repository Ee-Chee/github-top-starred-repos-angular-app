import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  onNextPage = output();
  onPageNavigation = output<string>();

  pagesList = input.required<string[]>();
  nextPage = input.required<string | null>();
  currentPage = input<string | undefined>();

  next() {
    this.onNextPage.emit();
  }

  navigate(page: string) {
    this.onPageNavigation.emit(page);
  }
}
