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