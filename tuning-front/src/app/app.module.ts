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
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  providers: [
    {
      provide: FirestoreDriver, useFactory: (db: AngularFirestore) => fireStoreFactory(db),
      deps: [AngularFirestore]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

const fireStoreFactory = (db: AngularFirestore) => {
  // localでfirestore emulatorを使う為に設定を上書きする
  if (environment.mode === 'local') {
    db.firestore.settings({
      host: 'localhost:8080',
      ssl: false,
      experimentalForceLongPolling: true
    });
  };
  return new FirestoreDriver(db);
};
