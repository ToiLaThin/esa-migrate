import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthorizedComponent } from './components/un-authorized.component';
import { SigninRedirectCallbackComponent } from './components/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './components/signout-redirect-callback.component';

const authRoutes: Routes = [
  {
    path: 'unauthorized',
    component: UnAuthorizedComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin-oidc',
    component: SigninRedirectCallbackComponent,
    pathMatch: 'full'
  },
  {
    path: 'signout-oidc',
    component: SignoutRedirectCallbackComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    UnAuthorizedComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
  ],
})
export class AuthModule { }
