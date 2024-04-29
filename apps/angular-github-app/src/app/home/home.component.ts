import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TokenValidationForm } from './home-form.interface';
import { Store } from '@ngrx/store';
import { validateToken } from '../_store/root/base-info/base.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { selectError } from '../_store/root/base-info/base.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private fB = inject(FormBuilder);
  private store = inject(Store);
  respErr$ = this.store.select(selectError);

  form: FormGroup<TokenValidationForm> = this.fB.nonNullable.group({
    token: ['', Validators.required],
  });

  onSubmit() {
    this.store.dispatch(
      validateToken({ token: this.form.controls.token.value })
    );
  }
}
