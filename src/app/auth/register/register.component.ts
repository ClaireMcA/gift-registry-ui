import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TokenPayload } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public credentials: TokenPayload = {
    name: '',
    password: ''
  };

  public error: string | null = null; 

  constructor(private authenticationService: AuthService, private router: Router) { }

  register() {
    this.error = null;
    this.authenticationService.register(this.credentials).subscribe();
  }

  ngOnInit(): void {}
}
