import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { StoreModule } from '@ngrx/store';
import { initialState, postListFeatureKey, postListReducer } from './state/post-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostListEffects } from './state/post-list.effect';
import { PostListFacade as PostListFacade } from './state/post-list.facade';


@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    PostListRoutingModule,
    StoreModule.forFeature(postListFeatureKey, postListReducer, { initialState }),
    EffectsModule.forFeature([PostListEffects])
  ],
  exports: [PostListComponent],
  providers: [PostListFacade, PostListEffects]
})
export class PostListModule { }
