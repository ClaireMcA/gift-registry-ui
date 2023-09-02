import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public readonly faHome = faHome;
  constructor(private authService: AuthService) {}

  public isAuthenticated$ = this.authService.isAuthenticated$;
  public user$ = this.authService.user$;

  public ngOnInit(): void {}

  public logout() {
    this.authService.logout()
  }

}
