import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from './search-bar/search-bar.component';
import { InputFileComponent } from './input-file/input-file.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    InputFileComponent
  ],
  exports: [
    SearchBarComponent,
    InputFileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
