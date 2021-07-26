import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../common/model/RegisterUser';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public userRegisterForm: FormGroup;
  public schoolId: string;
  public rollId: string;
  public currentView: number;
  public otpVal: string;
  public passwrd :string;
  public cpasswrd :string;
  public termnC :string;
  public loading: boolean;
  public schoolInfo: any;
  public studentInfo: any;
  public error: string;
  constructor(private _fb: FormBuilder, private _registerService: RegisterService,private _router: Router) {
    this.currentView = 1;
    this.loading = false;
    this.userRegisterForm = this._fb.group({
      schoolId: ['', [Validators.required,Validators.minLength(5)]],
      // email: ['', [Validators.required, Validators.email]],
      // name: ['', [Validators.required]],
      // password: ['', [Validators.required]],
      // confirmPassword: ['', [Validators.required]],
      // dob: ['', [Validators.required]],
      // roll: ['', [Validators.required]],
      // className: ['', [Validators.required]],
      // tnc: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void { }
  
  registerUser() {
    this.loading = true;
    this.error = null;
    // this._router.navigate(['/home'])
    if (this.currentView === 1) {
      this._registerService.checkSchoolRegisterNo(this.schoolId).subscribe({
        next: (value) => { console.log('value is : ', value); this.schoolInfo = value.data; },
        error: (err) => { console.log('error', err.error); this.handleError(err.error);  },
        complete: () => { console.log('success full!!!');  this.currentView++; this.loading=false },
      })
     }
    else if (this.currentView === 2) {
      this._registerService.checkRollNumber(this.rollId).subscribe({
        next: (value) => { console.log('student: ',value); this.studentInfo = value.data; },
        error: (err) => { console.log('error', err); this.handleError(err.error);  },
        complete: () => { console.log('success full!!!');  this.currentView++; this.loading=false},
      })
     }
    else if (this.currentView === 3) {
      this._registerService.verifyOTP(this.otpVal).subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('error', err);this.handleError(err.error); },
        complete: () => { console.log('success full!!!');  this.currentView++; this.loading=false},
      })
     }
    else {
      const payload: RegisterUser = {
        firstName: this.studentInfo.firstName,
        lastName: this.studentInfo.lastName,
        email: this.studentInfo.email,
        password: this.passwrd,
        rollId: this.studentInfo.rollId,
        className: this.studentInfo.className,
        school: {
          ...this.schoolInfo,
        },
      dob:this.studentInfo.dob,
      schoolId: this.schoolId,
    };
      this._registerService.registerUser(payload).subscribe({
        next: (value) => { console.log('value ',value) },
        error: (err) => { this.handleError(err.error); },
        complete: () => { console.log('success full!!!'); this.loading = false; this._router.navigate(['/app/dashboard']) },
      })
     }
   
  }

  handleError(err) {
    this.error = err.message;
    this.loading = false;
  }

}
