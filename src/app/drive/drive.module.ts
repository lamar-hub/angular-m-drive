import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriveComponent} from './drive.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import {DriveRoutingModule} from './drive-routing.module';
import {SharedModule} from '../shared/shared.module';
import { NumberToSizePipe } from './number-to-size.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchFilesPipe} from './my-files/search-files.pipe';
import {IconPipe} from './icon.pipe';
import {SortStringPipe} from './sort-string.pipe';
import {SortNumberPipe} from './sort-number.pipe';
import {SearchSharedsPipe} from './shared-with-me/search-shareds.pipe';
import {ModalComponent} from '../shared/modal/modal.component';
import {ShareModalComponent} from '../shared/share-modal/share-modal.component';
import {ToastComponent} from '../shared/toast/toast.component';
import {UpgradeModalComponent} from '../shared/upgrade-modal/upgrade-modal.component';
import {SettingsModalComponent} from '../shared/settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    DriveComponent,
    MyFilesComponent,
    SharedWithMeComponent,
    NumberToSizePipe,
    SearchFilesPipe,
    SearchSharedsPipe,
    IconPipe,
    SortStringPipe,
    SortNumberPipe,
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ModalComponent,
    ShareModalComponent,
    ToastComponent,
    UpgradeModalComponent,
    SettingsModalComponent
  ],
  exports: [
    NumberToSizePipe
  ],
  providers: [
    NumberToSizePipe,
    SearchFilesPipe,
    SearchSharedsPipe,
    IconPipe,
    SortStringPipe,
    SortNumberPipe
  ]
})
export class DriveModule { }
