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

    addPost(newPost: { userId: string; content: string }): void {
        this.store.dispatch(PostListActions.addPost(newPost));
    }

    deletePost(id: string): void {
        this.store.dispatch(PostListActions.deletePost({ id }));
    }
}
