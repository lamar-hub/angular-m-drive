import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriveComponent} from './drive.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import {DriveRoutingModule} from './drive-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from 'ng2-charts';
import { NumberToSizePipe } from './number-to-size.pipe';
import { DataTargetDirective } from './shared-with-me/data-target.directive';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DriveComponent,
    MyFilesComponent,
    SharedWithMeComponent,
    NumberToSizePipe,
    DataTargetDirective,
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class DriveModule { }
