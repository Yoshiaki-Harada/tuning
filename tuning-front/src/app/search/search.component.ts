import { Component, OnInit } from '@angular/core';
import { PostListFacade } from '../post-list/+state/post-list.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private postListFacade: PostListFacade) { }

  ngOnInit(): void {
  }

}
