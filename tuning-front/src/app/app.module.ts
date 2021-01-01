import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreDriver } from './core/driver/firestore-driver';
import { StoreModule } from '@ngrx/store';
import { Effect, EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
  ],
  providers: [
    {
      provide: FirestoreDriver
    },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: FIRESTORE_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:8080', ssl: false } : {} },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
