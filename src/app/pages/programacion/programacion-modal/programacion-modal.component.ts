import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { IntermedaryService } from 'src/app/core/services/intermedary.service';

@Component({
  selector: 'app-programacion-modal',
  templateUrl: './programacion-modal.component.html',
  styleUrls: ['./programacion-modal.component.css'],
})
export class ProgramacionModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  checkedModal = false;
  especialidades$: Observable<any>;
  medicos$: Observable<any>;
  turnos$: Observable<any>;
  consultorios$: Observable<any>;

  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private IS: IntermedaryService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pr_numero: [null],
      pr_fecha: [null],
      pr_servicio: [null],
      pr_consultorio: [null],
      pr_medico: [null],
      pr_turno: [null],
    });

    this.openModal();
    this.getEspecialidades();
    this.getTurno();
    this.getConsultorios();
  }

  openModal() {
    this.IS.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => (this.checkedModal = true));
  }

  closeModal() {
    this.form.reset();
    this.checkedModal = false;
  }

  getEspecialidades() {
    this.especialidades$ = this.http.getEspecialidades();
  }

  getMedico(id: any) {
    this.medicos$ = this.http.getMedicos(id);
  }

  getTurno() {
    this.turnos$ = this.http.getTurnos();
  }
  getConsultorios() {
    this.consultorios$ = this.http.getConsultorio();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
