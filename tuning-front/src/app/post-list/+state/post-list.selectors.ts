import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postListFeatureKey, Posts } from './post-list.reducer';

const getPostList = createFeatureSelector<Posts>(postListFeatureKey);

export const getPosts = createSelector(getPostList, (state: Posts) => state.items);

export const getEditingId = createSelector(getPostList, (state: Posts) => state.editingId);
