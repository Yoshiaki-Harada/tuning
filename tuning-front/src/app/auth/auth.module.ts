import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthFacade } from './state/auth.facade';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxAuthFirebaseUIModule,
    RouterModule.forChild([
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
    ]),
  ],
  providers: [AuthFacade]
})
export class AuthModule { }
