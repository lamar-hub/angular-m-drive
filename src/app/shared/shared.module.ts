import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SimpleConfirmationDialogComponent} from './simple-confirmation-dialog/simple-confirmation-dialog.component';
import {MaterialModule} from '../material/material.module';
import { ShareConfirmationDialogComponent } from './share-confirmation-dialog/share-confirmation-dialog.component';


@NgModule({
  declarations: [
    SimpleConfirmationDialogComponent,
    ShareConfirmationDialogComponent
  ],
  exports: [
    SimpleConfirmationDialogComponent,
    ShareConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule {
}
