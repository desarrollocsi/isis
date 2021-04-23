import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';
import { IntermedaryService } from 'src/app/core/services';

@Component({
  selector: 'app-agendasecretaria-filtro',
  templateUrl: './agendasecretaria-filtro.component.html',
  styleUrls: ['./agendasecretaria-filtro.component.css'],
})
export class AgendasecretariaFiltroComponent implements OnInit {
  especialidades$: Observable<any>;
  medicos$: Observable<any>;

  constructor(
    private AGS: AgendasecretariaService,
    private IS: IntermedaryService
  ) {}

  especialidad = new FormControl({ value: null, disabled: true });
  programacion = new FormControl({ value: null, disabled: true });
  fecha = new FormControl(null);

  ngOnInit(): void {
    this.getEspecialidades();
  }

  resetForm(fecha: string) {
    this.especialidad.reset(null);
    this.programacion.reset({ value: null, disabled: true });
    this.fecha.reset(fecha);
  }

  getEspecialidades() {
    this.especialidades$ = this.IS._fecha.pipe(
      tap((fecha) => this.resetForm(fecha)),
      switchMap((fecha: string) => this.AGS.getEspecialidades(fecha)),
      tap((_) => this.especialidad.enable())
    );
  }

  setData() {
    const fecha = this.fecha.value;
    const especialidad = this.especialidad.value;
    return { fecha, especialidad };
  }

  getMedicos() {
    this.programacion.reset(null);
    const data = this.setData();
    this.medicos$ = this.AGS.getMedico(data).pipe(
      tap((_) => this.programacion.enable())
    );
  }

  agendaMedica() {
    const data = JSON.parse(this.programacion.value);
    this.AGS.getIdProgramacion(data);
    this.AGS.getDataProgramacion(data);
  }
}
