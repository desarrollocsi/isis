import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProgramacionService } from '../services/programacion.service';
import { IntermedaryService } from '../../../core/services/intermedary.service';

@Component({
  selector: 'app-programacion-list',
  templateUrl: './programacion-list.component.html',
  styleUrls: ['./programacion-list.component.css'],
})
export class ProgramacionListComponent implements OnInit {
  listProgramaciones$: Observable<any>;
  programacion$: Observable<any>;
  constructor(
    private PS: ProgramacionService,
    private IS: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.getListProgramacion();
    this.IS.refresh.subscribe((data) => {
      this.getListProgramacion();
    });
  }

  getListProgramacion() {
    this.listProgramaciones$ = this.IS._fecha.pipe(
      switchMap((fecha: string) => this.PS.getProgramacionlist(fecha))
    );
  }

  onEdit(id: string) {
    this.IS.getEdit(id);
  }

  onDelete(id: string) {
    this.PS.getProgramacionDelete(id).subscribe(console.log);
  }
}
