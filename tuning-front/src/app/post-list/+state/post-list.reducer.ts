import { Action, createReducer, on } from '@ngrx/store';
import * as PostListActions from './post-list.action';

export const postListFeatureKey = 'postList';

export interface PostListState {
    readonly [postListFeatureKey]: Posts;
}

export interface Post {
    id: string;
    userId: string;
    content: string;
}

export interface Posts {
    items: Post[];
}

export const initialState: Posts = { items: [] };

const reducer = createReducer(
    initialState,
    on(PostListActions.loadPosts, (state, actions) => ({ ...state })),
    on(PostListActions.loadPostsSuccess, (state, action) => ({ ...state, items: [...action.posts] })),
    on(PostListActions.addPostSuccess, (state, action) => ({ ...state })),
    on(PostListActions.deletePostSuccess, (state, action) => ({ ...state }))
);

export const postListReducer = (state: Posts, action: Action): Posts => reducer(state, action);

