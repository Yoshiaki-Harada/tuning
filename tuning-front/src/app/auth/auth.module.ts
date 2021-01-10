import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthFacade } from './state/auth.facade';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuard, hasCustomClaim, redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer, initialState } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffcts } from './state/auth.effects';

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
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
  ],
  providers: [AuthFacade, AuthFacade]
})
export class AuthModule { }
