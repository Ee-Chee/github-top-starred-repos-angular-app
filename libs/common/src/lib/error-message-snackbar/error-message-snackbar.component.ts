import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'lib-error-message-snackbar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './error-message-snackbar.component.html',
  styleUrl: './error-message-snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageSnackbarComponent {
  toggleErrDetails = false;
  errorMessage = 'unknown';

  private data = inject<HttpErrorResponse | Error>(MAT_SNACK_BAR_DATA);
  private snackBarRef = inject(MatSnackBarRef<ErrorMessageSnackbarComponent>);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.errorMessage = this.data.toString();
  }
  close() {
    this.snackBarRef.dismiss();
  }

  toggle() {
    this.toggleErrDetails = !this.toggleErrDetails;
    this.cdr.detectChanges();
  }
}
