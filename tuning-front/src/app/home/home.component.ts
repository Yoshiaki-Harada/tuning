import { Component, OnInit } from '@angular/core';
import { PostListFacade } from '../post-list/state/post-list.facade';
import { Post } from '../post-list/state/post-list.reducer';
import { CreatedPost } from './model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postListFacase: PostListFacade) { }

  ngOnInit(): void {
    this.postListFacase.setPosts();
  }

  addPost(post: CreatedPost): void {
    this.postListFacase.addPost({ content: post.content });
  }
}
