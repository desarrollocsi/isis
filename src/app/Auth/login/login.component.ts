import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthStorageService, IntermedaryService } from '../../core/services';
import { Observable } from 'rxjs';

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
    private AST: AuthStorageService,
    private IS: IntermedaryService
  ) {}

  form: FormGroup;
  data$: Observable<any>;

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
    this.AS.postLogin(this.form.value).subscribe((data: any) => {
      this.AST.setMenu(data);
      this.AST.setUsuario(data);
      this.AST.setRol(data);
      this.countModulos(data.Rol[0].menu);
    });
  }

  countModulos(data: any) {
    if (data.filter((data: any) => data.nivel === 0).length > 1) {
      this.router.navigate(['modulos']);
      return;
    }

    this.AST.setModulos(data[0]);
    this.router.navigate(['home']);
  }
}
