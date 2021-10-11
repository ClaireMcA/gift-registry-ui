import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, mapTo, share, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Rsvp } from '../rsvp';
import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-rsvp-home',
  templateUrl: './rsvp-home.component.html',
  styleUrls: ['./rsvp-home.component.scss']
})
export class RsvpHomeComponent implements OnInit {
  public readonly faEnvelope = faEnvelope;
  public readonly faPeopleArrows = faPeopleArrows;
  private families = [
    "Matthew Butlier, Claire Micalieff",
    "Dmac Sizzle, Annekin"
  ]
  private onDestroy$ = new Subject();

  public userIsRsvped$ = this.rsvpService.rsvpedUsers$.pipe(
    withLatestFrom(this.authService.user$),
    map(([rsvpedUsers, userName]) => rsvpedUsers.includes(userName as string))
  );

  public submitSubject$ = new Subject();

  public rsvp: Partial<Rsvp> = { 
    names: '',
    canAttend: null,
    dietaryRequirements: null,
    dietaryDetails: '',
    comments: ''
  }

  public filteredFamilies = this.families.slice();
  public filterFamilies(selectedNames: string) {
    this.rsvp.names = selectedNames;
    this.filteredFamilies = this.families.filter(names => names.toLocaleLowerCase().includes(selectedNames.toLocaleLowerCase()))
  }

  private submitBegin$ = this.submitSubject$.pipe(
    withLatestFrom(this.authService.user$),
    map(([_, userName]) => ({ ...this.rsvp, userName }) as Rsvp),
  );

  private submit$ = this.submitBegin$.pipe(
    exhaustMap(rsvp => this.rsvpService.submit(rsvp).pipe(
      catchError(e => of({ v: null, e })),
      map(v => ({ v, e: null }))
    )),
    share()
  );

  public disableSave$ = merge(
    this.submitBegin$.pipe(mapTo(true)),
    this.submit$.pipe(
      filter(({ e }) => !!e), 
      mapTo(false)
    )
  );

  constructor(private rsvpService: RsvpService, private authService: AuthService) { }

  ngOnInit(): void {
    this.submit$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
