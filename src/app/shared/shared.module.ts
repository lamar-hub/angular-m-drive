import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {InputFileComponent} from './input-file/input-file.component';
import {ModalComponent} from './modal/modal.component';
import {ShareModalComponent} from './share-modal/share-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from './toast/toast.component';
import {UpgradeModalComponent} from './upgrade-modal/upgrade-modal.component';
import {SettingsModalComponent} from './settings-modal/settings-modal.component';


@NgModule({
  declarations: [
    SearchBarComponent,
    InputFileComponent,
    ModalComponent,
    ShareModalComponent,
    ToastComponent,
    UpgradeModalComponent,
    SettingsModalComponent
  ],
  exports: [
    SearchBarComponent,
    InputFileComponent,
    ModalComponent,
    ToastComponent,
    UpgradeModalComponent,
    SettingsModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
