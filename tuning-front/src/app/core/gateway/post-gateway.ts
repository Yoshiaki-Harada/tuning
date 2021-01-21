import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Filter, Post } from 'src/app/post-list/+state/post-list.reducer';
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

    getChangesBy(postFilter: Filter): Observable<Post[]> {
        return this.getChanges().pipe(
            map(posts => posts.filter(it => {
                console.log(it.content.includes(postFilter.word));
                return it.content.includes(postFilter.word);
            }))
        );
    }

    addPost(userId: string, content: string): void {
        this.firestoreDriver.addPost({ userId, content });
    }

    updatePost(id: string, content: string): void {
        this.firestoreDriver.updatePost(id, content);
    }

    delete(id: string): Promise<void> {
        return this.firestoreDriver.deletePost(id);
    }
}
