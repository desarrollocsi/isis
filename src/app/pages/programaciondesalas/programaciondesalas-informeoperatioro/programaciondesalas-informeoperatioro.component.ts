import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-programaciondesalas-informeoperatioro',
  templateUrl: './programaciondesalas-informeoperatioro.component.html',
  styleUrls: ['./programaciondesalas-informeoperatioro.component.css'],
})
export class ProgramaciondesalasInformeoperatioroComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
  }
}
