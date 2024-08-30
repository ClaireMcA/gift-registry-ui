import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { RegistryAdmin } from './registry-admin';

interface RegistryAdminMap {
  [key: string]: RegistryAdmin[]
}

@Injectable({
  providedIn: 'root'
})
export class RegistryAdminService {
  private onDestroy$ = new Subject<void>();
  private requestRegisterForItem$ = new Subject<{ id: string, user: string }>();
  private requestDeregisterForItem$ = new Subject<string>();

  public registryAdminSubject = new BehaviorSubject<RegistryAdmin[]>([]);

  public registryAdmin$ = this.registryAdminSubject.asObservable();

  public registryAdminMap$ = this.registryAdminSubject.pipe(
    map(items => items.reduce((acc, item) => acc[item.category] ? { 
      ...acc, 
      [item.category]: [ ...acc[item.category], item]
    } : { ...acc, [item.category]: [item] }, {} as RegistryAdminMap)
  ));

  private registerForItem$ = this.requestRegisterForItem$.pipe(
    withLatestFrom(this.authService.unparsedToken$),
    switchMap(([{ id, user }, token]) => this.http.post(`${environment.apiUrl}/registry-items/register`, { id, user }, { headers: { Authorization: `Bearer ${token}`}}).pipe(
        map(_ => ({ id, user }))
      )
    ),
    tap(({ id, user }) => this.registryAdminSubject.next(
      this.registryAdminSubject.getValue().map(item => item._id === id ? { ...item, userRegistered: user } : item)
    ))
  )

  private deregisterForItem$ = this.requestDeregisterForItem$.pipe(
    withLatestFrom(this.authService.unparsedToken$),
    switchMap(([id, token]) => this.http.post(`${environment.apiUrl}/registry-items/deregister`, { id }, { headers: { Authorization: `Bearer ${token}`}}).pipe(
        map(_ => id)
      )
    ),
    tap(id => this.registryAdminSubject.next(
      this.registryAdminSubject.getValue().map(item => item._id === id ? { ...item, userRegistered: null } : item)
    ))
  )

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<RegistryAdmin[]>(`${environment.apiUrl}/registry-items`).subscribe(result => {
      this.registryAdminSubject.next(result.sort((a, b) => a.category.localeCompare(b.category)));
    });

    merge(
      this.registerForItem$,
      this.deregisterForItem$
    ).pipe(takeUntil(this.onDestroy$)).subscribe()
  }

  public createItem(item: Omit<RegistryAdmin, '_id'>) {
    const token = this.authService.tokenSubject.getValue();

    this.http.post<RegistryAdmin>(`${environment.apiUrl}/registry-items`, item, { headers: { Authorization: `Bearer ${token}`}}).subscribe(result => {
      this.registryAdminSubject.next([
        ...this.registryAdminSubject.getValue(), 
        result
      ].sort((a, b) => a.category.localeCompare(b.category)));
    });
  }

  public deleteItem(id: string) {
    const token = this.authService.tokenSubject.getValue();

    this.http.delete<RegistryAdmin>(`${environment.apiUrl}/registry-items/${id}`, { headers: { Authorization: `Bearer ${token}`}}).subscribe(result => {
      this.registryAdminSubject.next(
        this.registryAdminSubject.getValue().filter(i => i._id !== id).sort((a, b) => a.category.localeCompare(b.category))
      );
    });
  }

  public registerForItem(id: string, user: string): void {
    this.requestRegisterForItem$.next({ id, user });
  }

  public deregisterForItem(id: string): void {
    this.requestDeregisterForItem$.next(id);
  } 

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
