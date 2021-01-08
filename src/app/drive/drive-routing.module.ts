import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DriveComponent} from './drive.component';
import {MyFilesComponent} from './my-files/my-files.component';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';
import {StorageUpgradeComponent} from './storage-upgrade/storage-upgrade.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: DriveComponent, children: [
      {path: '', redirectTo: 'my-files', pathMatch: 'full'},
      {path: 'my-files', component: MyFilesComponent},
      {path: 'shared-with-me', component: SharedWithMeComponent},
      {path: 'storage', component: StorageUpgradeComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DriveRoutingModule {
}
