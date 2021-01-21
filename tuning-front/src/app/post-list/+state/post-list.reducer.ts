import { Action, createReducer, on } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as PostListActions from './post-list.action';

export const postListFeatureKey = 'postList';

export interface PostListState {
    readonly [postListFeatureKey]: Posts;
}

export interface Filter {
    word: string;
}

export interface Post {
    id: string;
    userId: string;
    content: string;
}

export interface Posts {
    items: Post[];
    filter: Filter;
    editingId: string;
}

export const initialState: Posts = { items: [], editingId: null, filter: null };

const reducer = createReducer(
    initialState,
    on(PostListActions.loadPosts, (state, actions) => ({ ...state })),
    on(PostListActions.loadPostsSuccess, (state, action) => ({ ...state, items: [...action.posts], filter: null })),
    on(PostListActions.setFilter, (state, action) => ({ ...state, filter: action.filter })),
    on(PostListActions.addPostSuccess, (state, action) => ({ ...state })),
    on(PostListActions.startEditPost, (state, action) => ({ ...state, editingId: action.id })),
    on(PostListActions.cancelEditPost, (state, action) => ({ ...state, editingId: null })),
    on(PostListActions.updatePostSuccess, (state, action) => ({ ...state, editingId: null })),
    on(PostListActions.updateLocalPost, (state, action) => {
        const items = state.items
            .map(post => {
                if (post.id === action.id) {
                    return { ...post, content: action.content };
                } else {
                    return post;
                }
            });
        return { ...state, items };
    }),
    on(PostListActions.deletePostSuccess, (state, action) => ({ ...state }))
);

export const postListReducer = (state: Posts, action: Action): Posts => reducer(state, action);

