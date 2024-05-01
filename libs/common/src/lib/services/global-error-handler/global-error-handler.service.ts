import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageSnackbarComponent } from '../../error-message-snackbar/error-message-snackbar.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private snack = inject(MatSnackBar);

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      console.log('Response error is not handled here!');
    } else {
      // client runtime error
      this.snack.openFromComponent(ErrorMessageSnackbarComponent, {
        data: error,
        verticalPosition: 'top',
        // duration: 5000,
      });
    }
  }
}
