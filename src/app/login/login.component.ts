import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '/'; // Default to root if no returnUrl is provided

  constructor(
    private fb: FormBuilder,
    private authService: AuthCustomService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute // Inject ActivatedRoute to handle query parameters
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Get the returnUrl query parameter or set default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('Return URL:', this.returnUrl);
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('User is logged in');
        // Navigate to the returnUrl after successful login
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err: Error) => {
        console.error(err.message);
        this.openErrorSnackBar('Incorrect email or password');
      },
    });
  }

  private openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
