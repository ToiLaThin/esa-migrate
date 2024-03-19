import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SignalrService } from '../../core/services/signalr.service';

@Component({
  //selector: 'esa-signin-redirect-callback',
  template: ``,
  styles: []
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(
    private _authService: AuthService, 
    private _router: Router, 
    private _signalrService: SignalrService, 
    ) { }

  ngOnInit(): void {
    this._authService.finishLogin().then(() => {
      this._signalrService.initConnection();
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }

}
