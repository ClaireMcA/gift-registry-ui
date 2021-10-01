import { Injectable } from '@angular/core';
import { interval, merge, Subject, timer } from 'rxjs';
import { mapTo, switchMap, switchMapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject();
  
  private timedClear$ = this.errorSubject.pipe(
    switchMapTo(interval(5000).pipe(take(1))),
    mapTo(null)
  );

  public error$ = merge(this.errorSubject, this.timedClear$);

  constructor() { }

  public setError(err: any) {
    this.errorSubject.next(err);
  }

  public clearError() {
    this.errorSubject.next(null)
  }
}
