import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../auth/+state/auth.facade';
import { PostListFacade } from '../post-list/+state/post-list.facade';
import { Post } from '../post-list/+state/post-list.reducer';
import { CreatedPost } from './model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postListFacase: PostListFacade, private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.postListFacase.setPosts();
  }

  addPost(post: CreatedPost): void {
    this.authFacade.user.subscribe(user => {
      this.postListFacase.addPost({ userId: user.id, content: post.content });
    });
  }
}
