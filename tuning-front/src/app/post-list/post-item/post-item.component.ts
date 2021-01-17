import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { Post } from '../+state/post-list.reducer';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() isMine: boolean;
  @Output() deletePost: EventEmitter<string> = new EventEmitter();
  @Output() editPost: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.isMine);
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result !== undefined && result.delete) {
          this.deletePost.emit(this.post.id);
        }
      }
    );
  }

  onEdit() {
    this.editPost.emit(this.post.id);
  }
}
