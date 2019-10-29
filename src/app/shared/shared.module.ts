import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from './search-bar/search-bar.component';
import { InputFileComponent } from './input-file/input-file.component';
import { ModalComponent } from './modal/modal.component';
import { ShareModalComponent } from './share-modal/share-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SearchBarComponent,
    InputFileComponent,
    ModalComponent,
    ShareModalComponent,
    ToastComponent
  ],
  exports: [
    SearchBarComponent,
    InputFileComponent,
    ModalComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbToastModule
  ]
})
export class SharedModule { }
