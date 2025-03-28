import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthCustomService } from './auth-custom.service';

export const authGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true; 
  } else {
    
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; 
  }
};

export const adminGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  // Check if the user is authenticated and is an admin
  const user = authService.currentUser$.getValue();

  if (authService.isAuthenticated$.value && user?.role === 'admin') {
    return true;  // Allow access if user is an admin
  } else {
    // Redirect to login if not an admin or not authenticated
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};