import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  if('token' in localStorage !== true){
    return true;
  }else{
    inject(Router).navigate(['/tasks']);
    return false;
  }
};
