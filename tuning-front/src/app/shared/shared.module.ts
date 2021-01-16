import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [DeleteModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [DeleteModalComponent]
})
export class SharedModule { }
