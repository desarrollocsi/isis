import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthStorageService } from '../../core/services';

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
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onLogin() {
    this.AS.postLogin(this.form.value).subscribe((data) => {
      this.AST.setRol(data);
      this.AST.setUsuario(data);
      this.AST.setMenu(data);
      this.router.navigate(['modulos']);
    });
  }
}
