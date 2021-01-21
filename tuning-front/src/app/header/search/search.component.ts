import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Filter } from 'src/app/post-list/+state/post-list.reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<Filter> = new EventEmitter();
  searchForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      word: new FormControl('', Validators.required)
    });
  }

  onSearch(): void {
    const word = this.searchForm.value.word as string;
    this.searchEvent.emit({ word });
  }
}
