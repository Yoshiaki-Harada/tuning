import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthFacade } from '../auth/+state/auth.facade';
import { PostListFacade as PostListFacade } from './+state/post-list.facade';
import { Post } from './+state/post-list.reducer';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  editingId$: Observable<string>;

  constructor(private facade: PostListFacade, private authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.posts$ = this.facade.posts;
    this.editingId$ = this.facade.editingId;
  }

  deletePost(event): void {
    this.facade.deletePost(event);
  }

  isMine(post: Post): Observable<boolean> {
    const isMine = this.authFacade.isMine(post);
    return isMine;
  }

  startEdit(id: string) {
    this.facade.startEdit(id);
  }

  saveEdited(editedPost: Post) {
    this.facade.updatePost(editedPost.id, editedPost.content);
  }

  cancelEdit() {
    this.facade.cancelEdit();
  }

  isEdit(post: Post): Observable<boolean> {
    return this.editingId$.pipe(map(id => id === post.id));
  }
}
