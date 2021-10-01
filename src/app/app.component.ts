import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gift-registry';

  public error$ = this.errorService.error$;

  constructor(private errorService: ErrorService) {}
}
