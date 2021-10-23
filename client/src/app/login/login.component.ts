import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.userService.login({email, password}).subscribe(
      (data) => {
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = 'http://localhost:4200/tasks';
      },
      (err) => {
        this.error = err.error.message;
      }
    )
  }
}
