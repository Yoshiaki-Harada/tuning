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

const redirectLoggedInToHome = () => redirectLoggedInTo(['../']);
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot({
      configFactory: environment.firebase,
      config: {
        authGuardFallbackURL: '/login',
        authGuardLoggedInURL: '',
        toastMessageOnAuthSuccess: false
      }
    }),
    RouterModule.forChild([
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        ...canActivate(redirectLoggedInToHome)
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        ...canActivate(redirectLoggedInToHome)
      },
    ]),
  ],
  providers: [AuthFacade]
})
export class AuthModule { }
