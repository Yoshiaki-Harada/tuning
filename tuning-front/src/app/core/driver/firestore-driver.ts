import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type PostDto = { content: string };

@Injectable({
    providedIn: 'root',
})
export class FirestoreDriver {
    constructor(private db: AngularFirestore) {
    }

    loadPosts(): Observable<PostDto[]> {
        return this.db.collection<PostDto>('posts').valueChanges();
    }

    addPost(post: PostDto): Promise<DocumentReference<PostDto>> {
        return this.db.collection<PostDto>('posts').add(post);
    }
}

