import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-f419-eventoadverso',
  templateUrl: './f419-eventoadverso.component.html',
  styleUrls: ['./f419-eventoadverso.component.css'],
})
export class F419EventoadversoComponent implements OnInit {
  form: FormGroup;

  otrosArea = false;
  otrosColaboradores = false;

  constructor(private fb: FormBuilder, private MS: MessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null],
      historia: [null],
      descripcion: [null],
      otros: [null],
      turno: [null],
      colaborador: [null],
      colaborador1: [null],
      colaborador2: [null],
      colaborador3: [null],
      colaborador4: [null],
      colaborador5: [null],
      area: [null],
      area1: [null],
      area2: [null],
      area3: [null],
      area4: [null],
      area5: [null],
      area6: [null],
    });
  }

  get formEa() {
    return this.form.controls;
  }

  onCheckboxArea(event: any) {
    const checked = event.target.checked;
    const value = event.target.value;
    this.otrosArea = value === '6' && checked ? true : false;
    this.formEa.area.setValue(value);
  }

  onCheckboxColaborador(event: any) {
    const checked = event.target.checked;
    const value = event.target.value;
    this.otrosColaboradores = value === '5' && checked ? true : false;
    this.formEa.colaborador.setValue(value);
  }

  onSubmit() {
    console.log(this.form.value);
    this.MS.MessageInfo('Se registro la incidencia/evento adverso');
    this.form.reset();
  }
}
