// DELETE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatFormFieldModule, 
  MatInputModule,
  MatButtonModule,
  MatRippleModule,
  MatDialogModule,
  MatMenuModule,
  MatTableModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatButtonToggleModule
  ],
  declarations: []
})
export class AppMaterialModule { }
