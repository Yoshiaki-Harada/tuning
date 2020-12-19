import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FirestoreDriver } from 'src/app/core/driver/firestore-driver';
import * as PostListActions from './post-list.action';

@Injectable()
export class PostListEffects {
    loadArticles = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.loadPosts),
        switchMap(() => this.firestoreDriver.loadPosts()),
        map(postDtos => postDtos.map(e => ({ content: e.content }))),
        map(posts => PostListActions.loadPostsSuccess({ posts }))
    ));

    addPost = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.addPost),
        exhaustMap(action => this.firestoreDriver.addPost(action.post)),
        map(() => PostListActions.addPostSuccess())
    ));
    constructor(private actions$: Actions, private firestoreDriver: FirestoreDriver) { }
}
