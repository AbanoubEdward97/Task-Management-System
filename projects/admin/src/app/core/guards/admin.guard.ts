import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
export const adminGuard: CanActivateFn = (route, state) => {
  if('token' in localStorage){
    return true;
  }else{
    inject(Router).navigate(['/login']);
    return false;
  }
  
};

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   // console.log('guard status: ', inject(TokenService).authenticated());

//   return inject(TokenService).authenticated()
//     ? true
//     : inject(Router).createUrlTree(['/auth/login']);
// };