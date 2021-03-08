import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import { HttpService } from '../../../core/services/http.service';
import { ProgramacionService } from '../services/programacion.service';
import { MessageService } from '../../../core/services/message.service';
import { IntermedaryService } from 'src/app/core/services/intermedary.service';
import { ProgramacionForm } from '../../../core/models/programacion-form.class';

@Component({
  selector: 'app-programaccion-add-edit',
  templateUrl: './programaccion-add-edit.component.html',
  styleUrls: ['./programaccion-add-edit.component.css'],
})
export class ProgramaccionAddEditComponent implements OnInit {
  formProgramacion: FormGroup;

  especialidades$: Observable<any>;
  medicos$: Observable<any>;
  turnos$: Observable<any>;
  consultorios$: Observable<any>;
  programacionesData$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private PS: ProgramacionService,
    private MS: MessageService,
    private IS: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.formProgramacion = this.fb.group({
      pr_numero: [null],
      pr_fecha: [null],
      pr_servicio: [null],
      pr_consultorio: [null],
      pr_medico: [null],
      pr_turno: [null],
    });
    this.getEspecialidad();
    this.getTurnos();
    this.getConsultorio();
    this.setValue();
  }

  getEspecialidad() {
    this.especialidades$ = this.http.getEspecialidades();
  }

  getMedico(id: any) {
    this.medicos$ = this.http.getMedicos(id);
  }

  getTurnos() {
    this.turnos$ = this.http.getTurnos();
  }

  getConsultorio() {
    this.consultorios$ = this.http.getConsultorio();
  }

  setValue() {
    this.IS.dataProgramacion
      .pipe(
        filter((data) => data.length > 0),
        switchMap((data) => this.PS.getProgramacionShow(data))
      )
      .subscribe((data) =>
        this.formProgramacion.setValue(new ProgramacionForm(data))
      );
  }

  onSend() {
    this.PS.postProgramacion(this.formProgramacion.value).subscribe(
      (data: any) => {
        this.MS.MessageSucces(data['message']);
        this.formProgramacion.reset();
      }
    );
  }
}
