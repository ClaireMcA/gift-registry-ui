import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { RegistryItem } from './registry-item';

interface RegistryItemMap {
  [key: string]: RegistryItem[]
}

@Injectable({
  providedIn: 'root'
})
export class RegistryItemService {
  private onDestroy$ = new Subject();
  private requestRegisterForItem$ = new Subject<{ id: string, user: string }>();
  private requestDeregisterForItem$ = new Subject<string>();

  public registryItemsSubject = new BehaviorSubject<RegistryItem[]>([]);

  public registryItems$ = this.registryItemsSubject.asObservable();

  public registryItemsMap$ = this.registryItemsSubject.pipe(
    map(items => items.reduce((acc, item) => acc[item.category] ? { 
      ...acc, 
      [item.category]: [ ...acc[item.category], item]
    } : { ...acc, [item.category]: [item] }, {} as RegistryItemMap)
  ));

  private registerForItem$ = this.requestRegisterForItem$.pipe(
    withLatestFrom(this.authService.unparsedToken$),
    switchMap(([{ id, user }, token]) => this.http.post(`${environment.apiUrl}/registry-items/register`, { id, user }, { headers: { Authorization: `Bearer ${token}`}}).pipe(
        map(_ => ({ id, user }))
      )
    ),
    tap(({ id, user }) => this.registryItemsSubject.next(
      this.registryItemsSubject.getValue().map(item => item._id === id ? { ...item, userRegistered: user } : item)
    ))
  )

  private deregisterForItem$ = this.requestDeregisterForItem$.pipe(
    withLatestFrom(this.authService.unparsedToken$),
    switchMap(([id, token]) => this.http.post(`${environment.apiUrl}/registry-items/deregister`, { id }, { headers: { Authorization: `Bearer ${token}`}}).pipe(
        map(_ => id)
      )
    ),
    tap(id => this.registryItemsSubject.next(
      this.registryItemsSubject.getValue().map(item => item._id === id ? { ...item, userRegistered: null } : item)
    ))
  )

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<RegistryItem[]>(`${environment.apiUrl}/registry-items`).subscribe(result => {
      this.registryItemsSubject.next(result.sort((a, b) => a.category.localeCompare(b.category)));
    });

    merge(
      this.registerForItem$,
      this.deregisterForItem$
    ).pipe(takeUntil(this.onDestroy$)).subscribe()
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
