import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthStorageService, MessageService } from 'src/app/core/services';

@Component({
  selector: 'app-f419-eventoadverso',
  templateUrl: './f419-eventoadverso.component.html',
  styleUrls: ['./f419-eventoadverso.component.css'],
})
export class F419EventoadversoComponent implements OnInit {
  form: FormGroup;

  otrosArea = false;
  otrosColaborador = false;
  areas: any;
  colaboradores: any;
  otroArea = new FormControl(null);
  otroColaborador = new FormControl(null);
  constructor(
    private fb: FormBuilder,
    private MS: MessageService,
    private AST: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null],
      historia: [null],
      descripcion: [null],
      turno: [null],
      colaboradores: this.fb.array([]),
      areas: this.fb.array([]),
      usuario: [this.AST.User],

      a1: [null],
      a2: [null],
      a3: [null],
      a4: [null],
      a5: [null],
      a6: [null],

      c1: [null],
      c2: [null],
      c3: [null],
      c4: [null],
      c5: [null],
    });
    this.areas = this.form.get('areas') as FormArray;
    this.colaboradores = this.form.get('colaboradores') as FormArray;
  }

  get formEa() {
    return this.form.controls;
  }

  onCheckbox(event: any, opcion: string) {
    const checked = event.target.checked;
    const value = event.target.value;

    switch (opcion) {
      case 'AREA': {
        this.otrosArea = value === '6' && checked ? true : false;
        break;
      }
      case 'COLABORADOR': {
        this.otrosColaborador = value === '5' && checked ? true : false;
        break;
      }
    }

    if (checked) this.agregarData(value, opcion);
    if (!checked) this.deleteData(value, opcion);
  }

  agregarData(value: string, opcion: string) {
    const group = this.fb.group({
      codigo: [value],
      otros: [null],
    });

    switch (opcion) {
      case 'AREA': {
        if (value === '6') {
          this.otroArea.valueChanges.subscribe((data) =>
            group.controls.otros.setValue(data)
          );
        }
        this.areas.push(group);
        break;
      }
      case 'COLABORADOR': {
        if (value === '5') {
          this.otroColaborador.valueChanges.subscribe((data) =>
            group.controls.otros.setValue(data)
          );
        }
        this.colaboradores.push(group);
        break;
      }
    }
  }

  deleteData(codigo: any, opcion: string) {
    let index = 0;

    switch (opcion) {
      case 'AREA': {
        index = this.areas.value.findIndex((val: any) => val.codigo === codigo);
        this.areas.removeAt(index);
        break;
      }
      case 'COLABORADOR': {
        index = this.colaboradores.value.findIndex(
          (val: any) => val.codigo === codigo
        );
        this.colaboradores.removeAt(index);
        break;
      }
    }
  }

  onFormReset() {
    this.form.reset();
    this.form.controls.usuario.reset(this.AST.User);
    this.otrosArea = false;
    this.otrosColaborador = false;
  }

  onSubmit() {
    console.log(this.form.value);
    // this.MS.MessageInfo('Se registro la incidencia/evento adverso');
    // this.form.reset();
  }
}
