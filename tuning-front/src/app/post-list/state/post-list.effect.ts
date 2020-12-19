import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FirestoreDriver } from 'src/app/core/driver/firestore-driver';
import * as PostListActions from './post-list.action';

@Injectable()
export class PostListEffects {
    loadArticles = createEffect(() => this.actions$.pipe(
        ofType(PostListActions.loadPosts),
        switchMap(() => this.firestoreDriver.loadPosts()),
        map(postJsons => postJsons.map(e => ({ content: e.content }))),
        map(posts => PostListActions.loadPostsSuccess({ posts }))
    ));
    constructor(private actions$: Actions, private firestoreDriver: FirestoreDriver) { }
}
