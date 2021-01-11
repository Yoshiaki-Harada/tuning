import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../auth/+state/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: Observable<boolean>;

  constructor(private authFcade: AuthFacade) { }

  ngOnInit(): void {
    this.isLogin = this.authFcade.isLogin;
  }

  onLogout(): void {
    this.authFcade.logout();
  }
}
