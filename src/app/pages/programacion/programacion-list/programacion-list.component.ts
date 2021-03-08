import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
      console.log('refresh');
      this.getListProgramacion();
    });
  }

  getListProgramacion() {
    this.listProgramaciones$ = this.PS.getProgramacionlist();
  }

  onEdit(id: string) {
    this.IS.getEdit(id);
  }

  onDelete(id: string) {
    this.PS.getProgramacionDelete(id).subscribe(console.log);
  }
}
