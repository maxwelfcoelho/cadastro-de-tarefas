import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password
  });

  error: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(selectedValue => {
      this.error = ''
    })
  }

  register(): void {
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    this.userService
      .register({ name, email, password })
      .subscribe(data => {
        window.location.href = 'http://localhost:4200/login';
      },
      (err) => {
        this.error = err.error.message;
      })
  }
}
