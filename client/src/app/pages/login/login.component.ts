import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  error = '';

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ){ }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(selectedValue => {
      this.error = ''
    })
  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.login({email, password}).subscribe(
      (data) => {
        const decodedToken: any = jwt_decode(data.token);

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('name', decodedToken.name);
        return this.router.navigate(['/']);
      },
      (err) => {
        this.error = err.error.message;
      }
    )
  }
}
