import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../auth/+state/auth.facade';
import { Auth } from '../auth/+state/auth.reducer';
import { PostPort } from '../core/port/post-port';
import { PostListFacade as PostListFacade } from './+state/post-list.facade';
import { Post } from './+state/post-list.reducer';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private facade: PostListFacade, private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.posts$ = this.facade.posts;
  }

  deletePost(event): void {
    this.facade.deletePost(event);
  }

  isMine(post: Post): Observable<boolean> {
    const isMine = this.authFacade.isMine(post);
    console.log('called isMine');
    return isMine;
  }
}
