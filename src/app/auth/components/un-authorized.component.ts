import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ColorSvgNames } from '../../share-components/svg-definitions/color-svg-names.enum';

@Component({
  selector: 'esa-un-authorized',
  templateUrl: './un-authorized.component.html',
})
export class UnAuthorizedComponent implements OnInit {

  get ColorSvgNames() {
    return ColorSvgNames;
  }
  
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    return this._authService.login();
  }
}
