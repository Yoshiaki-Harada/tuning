import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { PostPort } from 'src/app/core/port/post-port';
import * as PostListActions from './post-list.action';

@Injectable()
export class PostListEffects {
    loadArticles = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.loadPosts),
        switchMap(() => this.postPort.getChanges()),
        map(posts => PostListActions.loadPostsSuccess({ posts }))
    ));

    addPost = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.addPost),
        tap(action => this.postPort.addPost(action.userId, action.content)),
        map(() => PostListActions.addPostSuccess())
    ));

    deletePost = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.deletePost),
        tap(action => this.postPort.delete(action.id)),
        map(() => PostListActions.deletePostSuccess())
    ));
    constructor(private actions$: Actions, private postPort: PostPort) { }
}
