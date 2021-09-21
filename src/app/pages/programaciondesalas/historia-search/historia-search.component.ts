import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProgramaciondesalasService } from '../services/';

@Component({
  selector: 'app-historia-search',
  templateUrl: './historia-search.component.html',
  styleUrls: ['./historia-search.component.css'],
})
export class HistoriaSearchComponent implements OnInit {
  constructor(private ProgramaciondesalasService: ProgramaciondesalasService) {}

  isModal: boolean = true;
  isSearch: boolean = true;
  dataProgramacion$: Observable<any>;
  dataProgramacion: [] = [];
  numeroDeHistoria: number;

  ngOnInit(): void {}

  searchPaciente(searchText: string) {
    this.dataProgramacion = [];
    this.numeroDeHistoria = undefined;
    this.ProgramaciondesalasService.getSearchHistoria(searchText).subscribe(
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

  closeModal() {
    this.isModal = false;
  }
}
