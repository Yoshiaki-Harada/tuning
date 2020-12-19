import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

type PostDto = { content: string };

@Injectable({
    providedIn: 'root',
})
export class FirestoreDriver {
    constructor(private db: AngularFirestore) {
    }

    loadPosts(): Observable<PostDto[]> {
        return this.db.collection<PostDto>('posts').valueChanges();
    }
}

