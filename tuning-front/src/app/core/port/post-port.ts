import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/post-list/+state/post-list.reducer';

@Injectable()
export abstract class PostPort {
    abstract getChanges(): Observable<Post[]>;
    abstract addPost(userId: string, content: string): void;
    abstract delete(id: string): void;
}
