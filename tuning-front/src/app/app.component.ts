import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tuning-front';
  comments: Observable<Comment[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    console.log('mode: ' + environment.mode);

    this.comments = this.db.collection<Comment>('comments').valueChanges();
  }
}
