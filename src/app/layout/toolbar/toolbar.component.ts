import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public isAuthenticated$ = this.authService.isAuthenticated$.pipe(tap(console.log))
  public user$ = this.authService.user$.pipe(tap(console.log));

  public ngOnInit(): void {}

  public logout() {
    this.authService.logout()
  }

}
