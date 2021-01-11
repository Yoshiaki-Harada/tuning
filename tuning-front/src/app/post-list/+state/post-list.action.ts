import { createAction, props } from '@ngrx/store';
import { Post } from './post-list.reducer';

export const loadPosts = createAction('[PostList] Load Posts');
export const loadPostsSuccess = createAction('[PostList] Load Posts Success', props<{ posts: Post[] }>());
export const addPost = createAction('[PostList] Add Post', props<{ post: Post }>());
export const addPostSuccess = createAction('[PostList] Add Post Success');
