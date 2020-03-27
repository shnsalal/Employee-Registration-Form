import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatDialogModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatProgressSpinnerModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatDialogModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
