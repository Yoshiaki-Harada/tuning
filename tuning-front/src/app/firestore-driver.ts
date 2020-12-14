import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FirestoreDriver {
    constructor(private db: AngularFirestore) {
    }

    getComments(): Observable<Comment[]> {
        return this.db.collection<Comment>('comments').valueChanges();
    }
}
