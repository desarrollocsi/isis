import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IntermedaryService } from '../../../core/services';

@Component({
  selector: 'app-programaciondesalas-informeoperatioro',
  templateUrl: './programaciondesalas-informeoperatioro.component.html',
  styleUrls: ['./programaciondesalas-informeoperatioro.component.css'],
})
export class ProgramaciondesalasInformeoperatioroComponent implements OnInit {
  programacionSalas$: Observable<any>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private IntermedaryService: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});

    this.programacionSalas$ =
      this.IntermedaryService._dataDeProgramacionDeSalas;
  }
}
