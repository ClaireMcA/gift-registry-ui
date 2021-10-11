import { Component, OnInit } from '@angular/core';
import { map, mapTo, switchMap, switchMapTo, take } from 'rxjs/operators';
import { RegistryItemService } from './registry-item.service';
import { faCartPlus, faLink, faPlus, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { combineLatest, from, interval, merge, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-registry-items',
  templateUrl: './registry-items.component.html',
  styleUrls: ['./registry-items.component.scss']
})
export class RegistryItemsComponent implements OnInit {
  public faLink = faLink;
  public faTimes = faTimes;
  public faCartPlus = faCartPlus;
  public faShoppingCart = faShoppingCart;
  public xAndY$ = new Subject<{ x: number, y: number}>();
  public animatePlusSubject$ = new Subject<boolean>();
  public animatePlus$ = merge(
    this.animatePlusSubject$,
    this.animatePlusSubject$.pipe(
      switchMap(_ => interval(1000).pipe(take(1))), 
      mapTo(false)
    )
  );

  constructor(private registryItemService: RegistryItemService, private authService: AuthService) { }

  public user$ = this.authService.user$ as Observable<string>;
  public registryItemsMap$ = this.registryItemService.registryItemsMap$;

  public myRegistryItems$ = combineLatest([
    this.user$,
    this.registryItemService.registryItems$
  ]).pipe(
    map(([user, registryItems]) => registryItems.filter(ri => ri.userRegistered === user))
  );

  ngOnInit(): void {
  }

  public deregister(id: string) {
    this.registryItemService.deregisterForItem(id);
  }

  public register($event: any, id: string, user: string | null) {
    this.xAndY$.next({ x: $event.x - 200, y: $event.y });
    this.animatePlusSubject$.next(false);
    this.animatePlusSubject$.next(true);
    this.registryItemService.registerForItem(id, user as string);
  }
}
