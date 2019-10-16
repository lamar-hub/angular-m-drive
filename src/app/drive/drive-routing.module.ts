import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DriveComponent} from './drive.component';
import {MyFilesComponent} from './my-files/my-files.component';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';

const routes: Routes = [
  {
    path: '', component: DriveComponent, children: [
      {path: '', redirectTo: 'my-files', pathMatch: 'full'},
      {path: 'my-files', component: MyFilesComponent},
      {path: 'shared-with-me', component: SharedWithMeComponent}
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
