import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostListFacade as PostListFacade } from './state/post-list.facade';
import { Post } from './state/post-list.reducer';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private facade: PostListFacade) { }

  ngOnInit(): void {
    this.posts$ = this.facade.posts;
  }

}
