import { createAction, props } from '@ngrx/store';
import { Post } from './post-list.reducer';

export const loadPosts = createAction('[PostList] Load Posts');
export const loadPostsSuccess = createAction('[PostList] Load Posts Success', props<{ posts: Post[] }>());
export const addPost = createAction('[PostList] Add Post', props<{ userId: string; content: string }>());
export const addPostSuccess = createAction('[PostList] Add Post Success');
export const deletePost = createAction('[PostList] Delete Post', props<{ id: string }>());
export const deletePostSuccess = createAction('[PostList] Delete Post Success');
export const deletePostFailure = createAction('[PostList] Delete Post Failure');
