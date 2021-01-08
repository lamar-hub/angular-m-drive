import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriveComponent} from './drive.component';
import {MyFilesComponent} from './my-files/my-files.component';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';
import {DriveRoutingModule} from './drive-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NumberToSizePipe} from './number-to-size.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconPipe} from './icon.pipe';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SimpleConfirmationDialogComponent} from '../shared/simple-confirmation-dialog/simple-confirmation-dialog.component';
import {ShareConfirmationDialogComponent} from '../shared/share-confirmation-dialog/share-confirmation-dialog.component';
import { StorageUpgradeComponent } from './storage-upgrade/storage-upgrade.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    DriveComponent,
    MyFilesComponent,
    SharedWithMeComponent,
    NumberToSizePipe,
    IconPipe,
    StorageUpgradeComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SimpleConfirmationDialogComponent,
    ShareConfirmationDialogComponent
  ],
  exports: [
    NumberToSizePipe
  ],
  providers: [
    NumberToSizePipe,
    IconPipe,
  ]
})
export class DriveModule {
}
