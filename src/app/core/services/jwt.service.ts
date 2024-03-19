import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
//https://stackoverflow.com/a/59280815/23165722 error with jwt_decode

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  
  decode(token: string): object {
    let decodedToken : object = jwtDecode(token);   
    console.log('decoded token: ', decodedToken); 
    return decodedToken;
  }
}
