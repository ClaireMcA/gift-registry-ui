import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SkipLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => isAuthenticated ? this.router.parseUrl('home') : true)
    )
  } 
}
