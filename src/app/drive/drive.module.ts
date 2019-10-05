import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriveComponent} from './drive.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { MySharingsComponent } from './my-sharings/my-sharings.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import {DriveRoutingModule} from './drive-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DriveComponent,
    MyFilesComponent,
    MySharingsComponent,
    SharedWithMeComponent,
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule
  ]
})
export class DriveModule { }
