import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreDriver } from './firestore-driver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: FirestoreDriver, useFactory: (db: AngularFirestore) => {
        // localでfirestore emulatorを使う為に設定を上書きする
        if (environment.mode === 'local') {
          console.log('use local firestore emulator');
          db.firestore.settings({
            host: environment.firestoreEmulatorUrl,
            ssl: false,
            experimentalForceLongPolling: true
          });
        };
        return new FirestoreDriver(db);
      },
      deps: [AngularFirestore]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
