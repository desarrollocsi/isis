import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AS: AuthService,
    private AST: AuthStorageService
  ) {}

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
    // if (this.form.valid) {
    //   this.AS.getMenu().subscribe((data: any) => this.AST.setMenu(data));
    // }
  }
}
