import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../state/auth.facade';
import { User } from '../state/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  onSuccess(user: User) {
    console.log(user);
    this.authFacade.loginSuccess(user);
  }

  onError(event) {
    console.log(event);
  }
}
