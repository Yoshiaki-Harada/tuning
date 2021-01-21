import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthFacade } from '../auth/+state/auth.facade';
import { PostListFacade } from '../post-list/+state/post-list.facade';
import { Filter } from '../post-list/+state/post-list.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: Observable<boolean>;

  constructor(private authFcade: AuthFacade, private postFacade: PostListFacade) { }

  ngOnInit(): void {
    this.isLogin = this.authFcade.isLogin;
  }

  onSearch(postFilter: Filter) {
    this.postFacade.setFilter(postFilter);
  }

  onLogout(): void {
    this.authFcade.logout();
  }
}
