import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void { }
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]],
    Username: ['', [Validators.required, Validators.minLength(1)]]
  })
  error = ''


  onSubmit(){
    const {email, Username, password } = this.form.getRawValue()
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    localStorage.setItem('Username', Username)
    this.router.navigate(['/dashboard']);
  }

  createAccount(){
    const {email, Username, password} = this.form.getRawValue()
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    localStorage.setItem('Username', Username)
    this.router.navigate(['/dashboard']);
  }
}
