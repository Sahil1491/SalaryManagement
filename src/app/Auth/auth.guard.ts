import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router) {
   
  }
 
  canActivate(){
    if(this.auth.isLoggedIn())
    {
      return true;
    }
   
    this.router.navigate(['/login']);
    return false;
   
  }

};
