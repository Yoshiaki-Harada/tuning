import { Component, OnInit } from '@angular/core';
import { PostListFacade } from '../post-list/state/post-list.facade';

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

}
