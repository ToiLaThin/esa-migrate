import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'esa-un-authorized',
  templateUrl: './un-authorized.component.html',
})
export class UnAuthorizedComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    return this._authService.login();
  }
}
