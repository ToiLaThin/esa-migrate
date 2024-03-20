import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStatus } from '../types/auth-status.enum';
import { JwtService } from './jwt.service';
import { environment as env } from '../../../environments/environment.development';
import { UserManager, User, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Store } from '@ngrx/store';
import { authActions } from '../../auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  private _user!: User;
  private get idpSettings() : UserManagerSettings {
    return {
      authority: `${env.BASEURL}/Auth/IdentityServer/`,
      //phải là localhost:5143 chứ ko đi qua ocelot(localhost:7003 vì nó sẽ đưa vào auth.identityserver 
      //là container mà brower ko biết đường dẫn đến container đó => 
      //gây lỗi dns probe finished nxdomain(có config dns, extra host hoặc cả host.docker.internal cũng ko được))
      metadataUrl: `${env.BASEURL}/Auth/IdentityServer/.well-known/openid-configuration`,
      client_id: env.CLIENTID,
      redirect_uri: `${env.CLIENTROOT}/auth/signin-oidc`,
      post_logout_redirect_uri: `${env.CLIENTROOT}/auth/signout-oidc`,
      scope: "openid profile MyApi.Scope User.Info",
      response_type: "code",
      userStore: new WebStorageStateStore({ store: localStorage })
      //lưu user vào localStorage vì session tắt tab sẽ mất
    }
  }

  private authStatusSub: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.Anonymous);
  get authStatus$() : Observable<AuthStatus> { 
    return this.authStatusSub.asObservable(); 
    //for other component observable to subscribe will be used to check if user authenticated or not
  } 

  userNameSub: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userName$: Observable<string> = this.userNameSub.asObservable();

  userRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userRole$: Observable<string> = this.userRoleSub.asObservable();
  
  get idToken() { 
    this.checkLoginStatus(); return this._user.id_token; 
  }

  get accessToken() { 
    this.checkLoginStatus(); return this._user.access_token; 
  }

  get authStatus() : AuthStatus { 
    //mỗi lần get phải check lại user có thay đổi không
    return this.checkLoginStatus();
  }

  set authStatus(status: AuthStatus) { 
    this.authStatusSub.next(status); 
  }

  get userId() { 
    return this._user.profile.sub; 
  }

  constructor(
    private _jwtService: JwtService,
    private _notificationService: NzNotificationService,
    private _store: Store
  ) {
    this._userManager = new UserManager(this.idpSettings);
    this.checkLoginStatus();
  }  

  private checkLoginStatus() : AuthStatus {
    //promise
    this._userManager.getUser().then((user: User | null) => { 
      if (this._user !== user) {
        if (user) {
          if (user.expired) { 
            this._notificationService.info('Your session has expired. Please login again.', '');
            this.logout();
          }
          this._user = user;
          this.authStatus = AuthStatus.Authenticated;
          this.setUserEssentialInfo(this._user.id_token!);
        }
        else { //this.logout() ?
          this._user = null!;
          this.authStatus = AuthStatus.Anonymous;
          this.clearUserEssentialInfo();
        }
      }
    });
    return this.authStatusSub.value;
  }

  login() { 
    return this._userManager.signinRedirect(); 
  }

  finishLogin() : Promise<User> {
    return this._userManager.signinRedirectCallback().then((user: User) => {
      this._notificationService.success('Login successfully', `This is the user: ${user}`);
      this._store.dispatch(authActions.loginSuccessfull({returnedUser: user}));
      return user!;
    });
  }

  logout() {
    return this._userManager.signoutRedirect();
    //In backend default controller for logout is AccountController
    //No webpage was found for the web address: https://localhost:7134/Account/Logout?logoutId=, if i delete cookieConfig.LogoutPath = "/Auth/Logout" in IdentityServer, it will redirect to this url
  }

  finishLogout() {
    return this._userManager.signoutRedirectCallback().then(() => {
      this._notificationService.success('Logout successfully', '');
      this._store.dispatch(authActions.logoutSuccessfull());
    });
  }

  private setUserEssentialInfo(idToken: string) {
    const decodedIdToken: object = this._jwtService.decode(idToken);
      this.userNameSub.next((decodedIdToken as any).name);
      this.userRoleSub.next((decodedIdToken as any).role);
  }

  private clearUserEssentialInfo() {
    this.userNameSub.next('');
    this.userRoleSub.next('');
  }
}
