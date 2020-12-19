import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, PostListState } from './post-list.reducer';
import { getPosts } from './post-list.selectors';
import * as PostListActions from './post-list.action';

@Injectable()
export class PostListFacade {
    readonly posts = this.store.select(getPosts);

    constructor(private store: Store<PostListState>) {
    }

    setPosts(): void {
        this.store.dispatch(PostListActions.loadPosts());
    }

    addPost(post: Post): void {
        this.store.dispatch(PostListActions.addPost({ post }));
    }
}
