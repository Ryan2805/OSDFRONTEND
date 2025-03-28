import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthCustomService } from '../auth-custom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authForm: FormGroup;
  isLoginMode = true;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthCustomService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.signup();
    }
  }

  private login() {
    const { email, password } = this.authForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error: () => {
        this.openSnackBar('Incorrect email or password', true);
      },
    });
  }

  private signup() {
    const { name, email, phonenumber, password } = this.authForm.value;
    this.authService.signup({ name, email, phonenumber, password }).subscribe({
      next: () => {
        this.openSnackBar('Signup successful! Please log in.', false);
        this.isLoginMode = true;
      },
      error: () => {
        this.openSnackBar('Signup failed. Try again.', true);
      },
    });
  }

  toggleMode(event?: Event) {
    if (event) {
      event.preventDefault(); // Prevents the default link behavior (page refresh)
    }
    this.isLoginMode = !this.isLoginMode; // Toggle between login and signup modes
  }

  private openSnackBar(message: string, isError: boolean) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
