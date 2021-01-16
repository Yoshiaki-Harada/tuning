import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from 'src/app/post-list/+state/post-list.reducer';

export type PostDto = {
    id: string;
    userId: string;
    content: string;
};

export type NewPostDto = {
    userId: string;
    content: string;
};

@Injectable({
    providedIn: 'root',
})
export class FirestoreDriver {
    constructor(private db: AngularFirestore) {
    }

    loadPosts(): Observable<PostDto[]> {
        return this.db.collection<PostDto>('posts').valueChanges({ idField: 'id' });
    }

    addPost(post: NewPostDto): Promise<DocumentReference<NewPostDto>> {
        return this.db.collection<NewPostDto>('posts').add(post);
    }

    deletePost(id: string): Promise<void> {
        const ref = this.db.collection<PostDto>('posts').doc(id);
        return ref.delete();
    }
}

