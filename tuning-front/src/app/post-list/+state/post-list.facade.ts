import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, PostListState } from './post-list.reducer';
import { getPosts, getEditingId } from './post-list.selectors';
import * as PostListActions from './post-list.action';

@Injectable()
export class PostListFacade {
    readonly posts = this.store.select(getPosts);
    readonly editingId = this.store.select(getEditingId);

    constructor(private store: Store<PostListState>) {
    }

    setPosts(): void {
        this.store.dispatch(PostListActions.loadPosts());
    }

    addPost(newPost: { userId: string; content: string }): void {
        this.store.dispatch(PostListActions.addPost(newPost));
    }

    startEdit(id: string): void {
        this.store.dispatch(PostListActions.startEditPost({ id }));
    }

    cancelEdit(): void {
        this.store.dispatch(PostListActions.cancelEditPost());
    }

    updatePost(id: string, content: string): void {
        this.store.dispatch(PostListActions.updateLocalPost({ id, content }));
        this.store.dispatch(PostListActions.updatePost({ id, content }));
    }

    deletePost(id: string): void {
        this.store.dispatch(PostListActions.deletePost({ id }));
    }
}
