import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from '../+state/post-list.reducer';

@Component({
  selector: 'app-post-edit-item',
  templateUrl: './post-edit-item.component.html',
  styleUrls: ['./post-edit-item.component.scss']
})
export class PostEditItemComponent implements OnInit {
  @Input() post: Post;
  @Output() editedPost: EventEmitter<Post> = new EventEmitter();
  @Output() cancelEditPost: EventEmitter<void> = new EventEmitter();
  postForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      content: new FormControl(this.post.content)
    });
  }

  onCancel(): void {
    this.cancelEditPost.emit();
  }

  onSave(): void {
    const content = this.postForm.value.content as string;
    this.editedPost.emit({ ...this.post, content });
  }
}
