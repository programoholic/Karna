import { Injectable } from '@angular/core';
import { LoginParams } from '../common/model/LoginParam';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  loginUser(credentials: LoginParams):Observable<any> {
    return this._http.post('/api/v1/login', credentials);
  }

  forgotPassword(email) {
    return this._http.post('', email);
  }


}
