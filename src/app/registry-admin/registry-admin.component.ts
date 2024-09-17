import { Component, OnInit } from '@angular/core';
import { map, mapTo, switchMap, switchMapTo, take } from 'rxjs/operators';
import { RegistryAdminService } from './registry-admin.service';
import { faCartPlus, faLink, faSpinner, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { combineLatest, from, interval, merge, Observable, Subject } from 'rxjs';
import { RegistryItem } from './registry-admin';

@Component({
  selector: 'app-registry-admin',
  templateUrl: './registry-admin.component.html',
  styleUrls: ['./registry-admin.component.scss']
})
export class RegistryAdminComponent implements OnInit {
  public faLink = faLink;
  public faTimes = faTimes;
  public faCartPlus = faCartPlus;
  public faShoppingCart = faShoppingCart;
  public faSpinner = faSpinner;
  public registryItem: Partial<RegistryItem> = { 
    title: '',
    description: '',
    userRegistered: null,
    hyperlink: '',
    category: '',
  }
  public xAndY$ = new Subject<{ x: number, y: number}>();
  public animatePlusSubject$ = new Subject<boolean>();
  public animatePlus$ = merge(
    this.animatePlusSubject$,
    this.animatePlusSubject$.pipe(
      switchMap(_ => interval(1000).pipe(take(1))), 
      mapTo(false)
    )
  );

  constructor(private registryAdminService: RegistryAdminService, private authService: AuthService) { }

  public user$ = this.authService.user$ as Observable<string>;
  public registryAdminMap$ = this.registryAdminService.registryAdminMap$;

  public myRegistryAdmin$ = combineLatest([
    this.user$,
    this.registryAdminService.registryAdmin$
  ]).pipe(
    map(([user, registryAdmin]) => registryAdmin.filter(ri => ri.userRegistered === user))
  );

  ngOnInit(): void {
  }

  public deregister(id: string) {
    this.registryAdminService.deregisterForItem(id);
  }

  public register($event: any, id: string, user: string | null) {
    this.xAndY$.next({ x: $event.x - 200, y: $event.y });
    this.animatePlusSubject$.next(false);
    this.animatePlusSubject$.next(true);
    this.registryAdminService.registerForItem(id, user as string);
  }
}
