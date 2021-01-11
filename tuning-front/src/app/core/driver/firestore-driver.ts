import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from 'src/app/post-list/+state/post-list.reducer';

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

    addPost(post: Post): Promise<DocumentReference<PostDto>> {
        return this.db.collection<PostDto>('posts').add(post);
    }
}

