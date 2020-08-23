import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material/material.module';
import { VerificationDialogComponent } from './log-in/verification-dialog/verification-dialog.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: 'log-in', pathMatch: 'full'},
      {path: 'log-in', component: LogInComponent},
      {path: 'sign-up', component: SignUpComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    SignUpComponent,
    VerificationDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {
}
