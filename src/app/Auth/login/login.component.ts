import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  nextPages() {
    this.router.navigate(['home']);
  }

  onLogin() {
    console.log(this.form.value);
  }
}
