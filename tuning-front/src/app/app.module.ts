import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreDriver } from './core/driver/firestore-driver';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AuthGuard } from './auth/auth.guard';
import { LocalStorageDriver } from './core/driver/local-storage-driver';
import { UserPort } from './core/port/user-port';
import { UserGateway } from './core/gateway/user-gateway';
import { PostPort } from './core/port/post-port';
import { PostGateway } from './core/gateway/post-gateway';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './header/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreRouterConnectingModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    SharedModule,
  ],
  providers: [
    { provide: AuthGuard },
    { provide: LocalStorageDriver },
    { provide: FirestoreDriver },
    { provide: UserPort, useClass: UserGateway },
    { provide: PostPort, useClass: PostGateway },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9099] : undefined
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined
    },
    {
      provide: FIRESTORE_SETTINGS,
      useValue: environment.useEmulators ? {
        host: 'localhost:8080',
        ssl: false,
        experimentalForceLongPolling: true
      } : {}
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
