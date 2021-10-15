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
    "Aimee and Bob",
    "Alan and Karyn",
    "Aleisha Butler",
    "Alister and Jasmine",
    "Andrew Heath",
    "Andrew and Jocelyn",
    "Andrew, Tanya, Liam, Ethan, Zahara and Ayana",
    "Annie Vanderstoep",
    "Ardeena Heffernan",
    "Barb and Justin",
    "Bella Sanders-Wills",
    "Ben, Anna and Emily",
    "Bill and Christine",
    "Brian and Barb",
    "Brooklyn Thomas",
    "Choqi and Hanna",
    "Chris, Annette and Floyd",
    "Christie, Nick, Elarah, Finn and Jaimee",
    "Daniel and Ellyn",
    "Danny, Anneke, Dietrich (and The Big Bump)",
    "Davey and Charlotte",
    "David and Alison",
    "David and Nicole",
    "Derek and Leanne",
    "George and Chris",
    "Ian Butler",
    "Fran and Viv",
    "Hope Sanders-Wills",
    "Jackie, David and Ben",
    "Jacob and Karen",
    "Jacqui and Glen",
    "Jaedin Garrard",
    "Jake and Naomi",
    "James, Liz, Josh, Ollie, Sam, Judah and Sophie",
    "Jess and Nathan",
    "Jesse Rose",
    "JJ and Holly",
    "John, Linda and Erin",
    "Josh and Hannah",
    "Josh and Isobel",
    "Karim and Ella",
    "Katie McAuliffe",
    "Katja Everson",
    "Mikayla Thomas",
    "Kelly, Allan, Kieran and Zoe",
    "Kylie, Rostyn, Rohan and Ashlyn",
    "Linda, Scott, Lauren and Amy",
    "Lindi Rebel",
    "Luke, Tegan, Mia and Eligh",
    "Michael and Carmel",
    "Michael, Rach and Quinn",
    "Mieke Rebel",
    "Mike and Barb",
    "Mitch and Tia",
    "Sue Butler",
    "Nathan and Karen",
    "Nathan, Julie and Franklyn",
    "Pete and Sue",
    "Peter and Kaye",
    "Peter, Alicia, Eliza and Naish",
    "Phil and Carol",
    "Rhonda Trenchuk",
    "Rio and Brie",
    "Ru, Tahlia and Elandre",
    "Rudi and Jasja",
    "Ryan and Lauren",
    "Sarah Clements",
    "Shenae Smith",
    "Sheri Thomas",
    "Somya Singh",
    "Steve, Amber and Riley",
    "Victoria Garrard",
    "Wayne, Sophie and Amber",
    "William Millard-Cartwright"
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
