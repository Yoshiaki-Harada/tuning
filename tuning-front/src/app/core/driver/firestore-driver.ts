import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

type PostJson = { content: string };

@Injectable({
    providedIn: 'root',
})
export class FirestoreDriver {
    constructor(private db: AngularFirestore) {
    }

    loadPosts(): Observable<PostJson[]> {
        return this.db.collection<PostJson>('posts').valueChanges();
    }
}

