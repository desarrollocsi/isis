import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services/';

@Component({
  selector: 'app-programaciondesalas-modal-salas',
  templateUrl: './programaciondesalas-modal-salas.component.html',
  styleUrls: ['./programaciondesalas-modal-salas.component.css'],
})
export class ProgramaciondesalasModalSalasComponent implements OnInit {
  isModal: boolean = false;
  disponibilidadDeSalas$: Observable<any>;

  constructor(
    private IntermedaryService: IntermedaryService,
    private ProgramaciondesalasService: ProgramaciondesalasService
  ) {}

  ngOnInit(): void {
    this.IntermedaryService.modal.subscribe((_) => (this.isModal = true));
    this.getDisponibilidadDeSalas();
  }

  getDisponibilidadDeSalas() {
    this.disponibilidadDeSalas$ = this.IntermedaryService._fecha.pipe(
      switchMap((fecha: string) =>
        this.ProgramaciondesalasService.getDisponibilidadDeSalas(fecha, '01')
      )
    );
  }

  closeModal() {
    this.isModal = false;
  }
}
