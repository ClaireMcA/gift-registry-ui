import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rsvp } from './rsvp';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private rsvps$ = new BehaviorSubject<Rsvp[]>([]);

  public rsvpedUsers$ = this.rsvps$.pipe(
    map(rsvps => rsvps.map(rsvp => rsvp.userName))
  );

  constructor(private http: HttpClient) {
    this.http.get<Rsvp[]>(`${environment.apiUrl}/rsvps`).subscribe(rsvps => this.rsvps$.next(rsvps))
  }

  public submit(rsvp: Rsvp) {
    return this.http.post<Rsvp>(`${environment.apiUrl}/rsvp`, rsvp).pipe(
      tap(rsvp => this.rsvps$.next([ ...this.rsvps$.getValue(), rsvp ]))
    )
  }
}
