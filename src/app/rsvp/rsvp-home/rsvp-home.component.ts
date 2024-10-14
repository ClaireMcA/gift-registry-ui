import { Component, OnInit } from '@angular/core';
import { faEnvelope, faUserSecret, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, filter, map, mapTo, share, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Rsvp } from '../rsvp';
import { RsvpService } from '../rsvp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsvp-home',
  templateUrl: './rsvp-home.component.html',
  styleUrls: ['./rsvp-home.component.scss']
})
export class RsvpHomeComponent implements OnInit {
  public readonly faEnvelope = faEnvelope;
  public readonly faUserSecret = faUserSecret;
  public readonly faSpinner = faSpinner;
  private families = [
    "Glenn and Jacqui Thomas",
    "Alison Sullivan",
    "John and Michelle Sullivan",
    "Kaitlyn Harkness",
    "Sheri and Pinso Thattassheri",
    "Brooke Thomas",
    "Blake Barrett and Abbey Stone",
    "Brayden Sullivan and Ashleigh Wilson",
    "Ann and Grant Hall",
    "Steve, Amber and Riley Hall",
    "Maddy and Brodie Duell",
    "Andrew, Emily, Frankie, Belle and Georgie Drenovski ",
    "Josh, Ali, Evie and Millie Blieschke",
    "Phyllisia and Lex Akers",
    "Faye Arkethon",
    "David and Jenny Thomas",
    "Dallas and Ruth Thomas",
    "Allison and John Watson",
    "Julie and Brendan Thomas",
    "Matt and Tammy Thomas",
    "Eloise and Jeremy Watson",
    "Janelle and David Taylor",
    "Nick and Deb Watson",
    "Michael and Rachel Butler-Wills",
    "Hope and Bella Sanders-Wills",
    "Sophie Pearce and Wayne Trenchuk",
    "Daniel Packer",
    "Steph Scanell",
    "Madelyne and Calvin Cracknell-Blackney",
    "Jo and Joel Zerna",
    "Ruth and Reg Holfter",
    "Matt and Claire Butler",
    "Sean Kenny and Sam Errity",
    "Nathan Fisher and Jade Cornell",
    "Chris Cooper",
    "Helen Satterly",
    "Mary and Brian Fisher",
    "Grandma Thomas",
    "Belinda Ewen",
    "Jakob Sutton",
    "Nelson Griffiths",
    "Sunique and Jason Bosman",
    "Rob Harkness",
  ]
  public submitted = false;
  
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

  rsvpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    canAttend: new FormControl(null, {
      validators: Validators.required
    }),
    comments: new FormControl(''),
    dietaryRequirements: new FormControl(null, {
      validators: Validators.required
    }), 
    dietaryDetails: new FormControl(''),
  });

  // registerForm = new FormGroup({
  //   name: new FormControl(''),
  //   attendance: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl('')
  // });

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


  onSubmit(): void {
    this.submitted = true;

    if (this.rsvpForm.invalid) {
      console.log(JSON.stringify(this.rsvpForm.value, null, 2));
      return; 
    } else {
      this.submitSubject$.next();
    }

    console.log(JSON.stringify(this.rsvpForm.value, null, 2));
  }

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
