import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageSnackbarComponent } from './error-message-snackbar.component';

describe('ErrorMessageSnackbarComponent', () => {
  let component: ErrorMessageSnackbarComponent;
  let fixture: ComponentFixture<ErrorMessageSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
