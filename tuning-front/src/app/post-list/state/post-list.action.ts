import { createAction, props } from '@ngrx/store';
import { Post } from './post-list.reducer';

export const loadPosts = createAction('[PostList] Load Posts');
export const loadPostsSuccess = createAction('[PostList] Load Posts Success', props<{ posts: Post[] }>());
