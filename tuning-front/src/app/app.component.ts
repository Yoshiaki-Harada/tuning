import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreDriver } from './firestore-driver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tuning-front';
  comments: Observable<Comment[]>;

  constructor(private store: FirestoreDriver) { }

  ngOnInit(): void {
    this.comments = this.store.getComments();
  }
}
