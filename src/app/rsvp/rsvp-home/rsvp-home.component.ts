import { Component, OnInit } from '@angular/core';
import { faEnvelope, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, filter, map, mapTo, share, takeUntil, withLatestFrom } from 'rxjs/operators';
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
  public readonly faUserSecret = faUserSecret;
  private families = [
    "Andrew & Jocelyn Steele",
    "Angela Payne",
    "Angeline Geoghegan",
    "Belinda Latham",
    "Ben Frogley",
    "Brendon Jones & Elysia",
    "Chris Latham",
    "Daniel Neville",
    "Daniel, Jenny, Victoria, Laura & David Garrard",
    "Danny & Anneke McAuliffe",
    "Dionne, Jeremy, Amy & Charlotte",
    "Elida Solano",
    "Eric & Patricia Frith",
    "Gypsy Foster",
    "Ian & Sara Fitzgerald",
    "Ito & Jessica Rivera",
    "Jason, Bindi & Emily King",
    "Jeanette McTaggart",
    "Jesse & Ardeena Rose",
    "Jesse Salvair",
    "Jessica & Evelyn Laufer",
    "Jessica Latham",
    "John, Linda, Josh, Erin, Andy & Nathan Garrard",
    "Jono & Emily Mills",
    "Joshua & Carlie Rub",
    "Joshua & Hannah Colbourn",
    "Mabel Smart",
    "Matt & Claire Butler",
    "Maurie & Margaret May",
    "Mel Griffith",
    "Michael & Jacqui van den Bos",
    "Michael Chasky",
    "Michael, Gabbi, Laura, Hannah, Julia & Ella Gerritsen",
    "Mieke Rebel",
    "Neil & Anne Megee",
    "Richard",
    "Rodney & Rose Silcock",
    "Rosemary",
    "Rostyn & Kylie Heffernan",
    "Sean, Kathryn, Caleb, Connor, Jack, Lucas & Pippa Robinson",
    "Stephanie Laufer",
    "Timu",
    "Will, Kate, Jacob & Joshua"
  ]
  private onDestroy$ = new Subject();

  public usersRsvp$ = this.rsvpService.rsvpedUsers$.pipe(
    withLatestFrom(this.authService.user$),
    map(([rsvpedUsers, userName]) => rsvpedUsers.find(user => user.userName === userName))
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
