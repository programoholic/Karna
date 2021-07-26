import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userLoginForm: FormGroup;
  public errorText: string;
  public loading: boolean;
  constructor(
    private _LoginService: LoginService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.loading = false;
    this.userLoginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.loading = true;
    this.errorText = null;
    console.warn(this.userLoginForm.value);
    const { email, password } = this.userLoginForm.value;
    this._LoginService.loginUser({ email, password }).subscribe({
      error: (err) => {
        this.handleError(err);
        this.loading = false;
      },
      complete: () => {
        console.log('succeessfulle');
        this.loading = false;
        this._router.navigate(['/app/dashboard'])
      },
    });
  }

  handleError(errResponse) {
    console.log(errResponse.error);
    this.errorText =
      errResponse?.error?.message ||
      'Internal Server Error, Please try again later!';
    // setTimeout(() => {this.errorText=null },5*1000)
  }
}
