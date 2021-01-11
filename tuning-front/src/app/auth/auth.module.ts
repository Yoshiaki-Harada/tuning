import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthFacade } from './+state/auth.facade';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer, initialState } from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffcts } from './+state/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot({
      configFactory: environment.firebase,
      appNameFactory: () => 'TUNING',
      config: {
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
      }
    }),
    StoreModule.forFeature(authFeatureKey, authReducer, { initialState }),
    EffectsModule.forFeature([AuthEffcts]),
    AuthRoutingModule
  ],
  providers: [AuthFacade, AuthFacade]
})
export class AuthModule { }
