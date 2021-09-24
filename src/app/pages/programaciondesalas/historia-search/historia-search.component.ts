import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProgramaciondesalasService } from '../services/';

@Component({
  selector: 'app-historia-search',
  templateUrl: './historia-search.component.html',
  styleUrls: ['./historia-search.component.css'],
})
export class HistoriaSearchComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private ProgramaciondesalasService: ProgramaciondesalasService) {}

  isModal: boolean = true;
  isSearch: boolean = true;
  dataProgramacion$: Observable<any>;
  dataProgramacion: any = [];
  numeroDeHistoria: number;

  ngOnInit(): void {
    this.ProgramaciondesalasService.historia
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((historia: string) =>
          this.ProgramaciondesalasService.getPaciente(historia)
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.dataProgramacion.push(data), (this.isSearch = false);
      });
  }

  searchPaciente(searchText: string) {
    this.dataProgramacion = [];
    this.numeroDeHistoria = undefined;
    this.ProgramaciondesalasService.getSearchPaciente(searchText).subscribe(
      (data) => (this.dataProgramacion = data)
    );
  }

  pacienteSeleccionado({ historia, nombreCompletoDelPaciente, edad }) {
    const data = {
      cq_numhis: historia.toString().padStart(10, '0'),
      cq_paciente: nombreCompletoDelPaciente,
      cq_edad: edad,
    };
    this.ProgramaciondesalasService.datoDelpaciente.next(data);
    this.isSearch = false;
    this.numeroDeHistoria = historia;
  }

  habilitarSearch() {
    this.isSearch = true;
    this.dataProgramacion = [];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
