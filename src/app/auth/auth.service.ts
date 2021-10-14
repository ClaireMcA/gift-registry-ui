import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface UserDetails {
  _id: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {
  constructor(
    private http: HttpClient, 
    private router: Router,
  ) {}

  public tokenSubject = new BehaviorSubject(localStorage.getItem('gift-registry-jwt'));
  public unparsedToken$ = this.tokenSubject.asObservable();
  public token$: Observable<UserDetails | null> = this.unparsedToken$.pipe(
    map(token => {
      if (token) {
        let payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      } else {
        return null;
      }
    })
  )

  public isAuthenticated$ = this.token$.pipe(
    map(token => token !== null && token.exp > Date.now() / 1000)
  )

  public user$ = this.token$.pipe(
    map(token => token !== null ? token.name : null)
  );

  public logout(): void {
    this.tokenSubject.next(null);
    window.localStorage.removeItem('gift-registry-jwt');
    this.router.navigateByUrl('/');
  } 

  public register(user: TokenPayload): Observable<any> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/registerorlogin`, user).pipe(
      tap(({ token }) => {
        window.localStorage.setItem('gift-registry-jwt', token);
        this.tokenSubject.next(token);
        this.router.navigate(["home"]);
      })
    )
  }
}
