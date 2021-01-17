import { createAction, props } from '@ngrx/store';
import { Post } from './post-list.reducer';

export const loadPosts = createAction('[PostList] Load Posts');
export const loadPostsSuccess = createAction('[PostList] Load Posts Success', props<{ posts: Post[] }>());
export const addPost = createAction('[PostList] Add Post', props<{ userId: string; content: string }>());
export const addPostSuccess = createAction('[PostList] Add Post Success');
export const startEditPost = createAction('[PostList] Start Edit Post', props<{ id: string }>());
export const cancelEditPost = createAction('[PostList] Cancel Edit Post');
export const updatePost = createAction('[PostList] Update Post', props<{ id: string; content: string }>());
export const updatePostSuccess = createAction('[PostList] Update Post Success');
// 画面上で更新したテキストが一旦元のが表示されて，更新されたのが後から表示されるのを防ぐ為
// 失敗したとき面倒な気もする．．
export const updateLocalPost = createAction('[PostList] Update Local Post Success', props<{ id: string; content: string }>());
export const deletePost = createAction('[PostList] Delete Post', props<{ id: string }>());
export const deletePostSuccess = createAction('[PostList] Delete Post Success');
export const deletePostFailure = createAction('[PostList] Delete Post Failure');
