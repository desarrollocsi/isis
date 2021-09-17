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
  dataProgramacion$: Observable<any>;

  ngOnInit(): void {
    this.dataProgramacion$ =
      this.ProgramaciondesalasService.getSearchHistoria('VARGAS');
  }

  closeModal() {
    this.isModal = false;
  }
}
