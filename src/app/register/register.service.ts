import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RegisterUser } from '../common/model/RegisterUser';
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient) { }

  registerUser(registerPayload: RegisterUser): Observable<any>  {
    console.log('ggin to register with : ', registerPayload);
    
    return this._http.post('/api/v1/register/student', registerPayload);
    // console.log('register user: ', this.registerUser);
    // //  return this._http.post('', registerPayload);
    // return of('dummy').pipe(delay(1000))
  }
  checkSchoolRegisterNo(schoolId: string): Observable<any> {
    // const school = { name: "DPS,  RK Puram", id: '123456' };
    // return of(school).pipe(delay(1000));
    return this._http.post('/api/v1/register/schools', { schoolId });
  }
  checkRollNumber(studentId: string): Observable<any> {
    return this._http.post('/api/v1/register/student/verify', { studentId });
    // return of({ name: "Anis", email: 'abc@gmail.com', roll: 'roll', schoolId: 'id', dob: '', class: '' }).pipe(delay(1000));
  }
  verifyOTP(otp: string): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  
}
