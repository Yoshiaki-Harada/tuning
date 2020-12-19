import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatedPost } from '../model';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Output() addPost: EventEmitter<CreatedPost> = new EventEmitter();
  postForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const newPost: CreatedPost = { ...this.postForm.value };
    this.addPost.emit(newPost);
  }

  private initForm(): void {
    this.postForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }
}
