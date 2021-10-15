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

  public rsvpedUsers$ = this.rsvps$.asObservable();
  
  constructor(private http: HttpClient) {
    this.http.get<Rsvp[]>(`${environment.apiUrl}/rsvps`).subscribe(rsvps => this.rsvps$.next(rsvps))
  }

  public submit(rsvp: Rsvp) {
    return this.http.post<Rsvp>(`${environment.apiUrl}/rsvp`, rsvp).pipe(
      tap(_ => {
        this.rsvps$.next([ ...this.rsvps$.getValue(), rsvp ])
      })
    )
  }
}
