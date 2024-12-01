import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Replace this with your actual authentication logic
  const isLoggedIn = true/* Implement your authentication check logic */;

  if (!isLoggedIn) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
  return true;
};
