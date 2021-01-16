import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/post-list/+state/post-list.reducer';
import { FirestoreDriver, PostDto } from '../driver/firestore-driver';
import { PostPort } from '../port/post-port';

@Injectable()
export class PostGateway extends PostPort {
    constructor(private firestoreDriver: FirestoreDriver) {
        super();
    }

    getChanges(): Observable<Post[]> {
        return this.firestoreDriver.loadPosts().pipe(
            map((posts: PostDto[]) => posts.map(e => ({ id: e.id, userId: e.userId, content: e.content })))
        );
    }

    addPost(userId: string, content: string): void {
        this.firestoreDriver.addPost({ userId, content });
    }

    delete(id: string): Promise<void> {
        return this.firestoreDriver.deletePost(id);
    }
}
