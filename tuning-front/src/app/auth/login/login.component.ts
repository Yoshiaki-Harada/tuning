import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../+state/auth.facade';
import { User } from '../+state/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  onSuccess(event) {
    const user: User = {
      providerId: event.providerId,
      displayName: event.displayName,
      email: event.email,
      photoURL: event.photoURL,
      id: event.uid,
      refreshToken: event.refreshToken
    };
    this.authFacade.loginSuccess(user);
  }

  onError(event) {
    console.log(event);
  }
}
