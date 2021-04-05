import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IntermedaryService } from 'src/app/core/services/intermedary.service';
import { FormdinamicoService } from '../services/formdinamico.service';

@Component({
  selector: 'app-formdinamico-modal',
  templateUrl: './formdinamico-modal.component.html',
  styleUrls: ['./formdinamico-modal.component.css'],
})
export class FormdinamicoModalComponent implements OnInit {
  form$: Observable<any>;
  modal$: Observable<any>;
  status: boolean = false;
  form: FormGroup;
  constructor(
    private IS: IntermedaryService,
    private FS: FormdinamicoService
  ) {}
  ngOnInit(): void {
    this.form$ = this.IS._route.pipe(
      switchMap((data: string) => this.FS.getApiFormDynamic(data)),
      map((data: any) => {
        this.form = this.FS.formGroup(data);
        this.status = false;
        return data;
      })
    );
    this.onOpenModal();
  }

  onOpenModal() {
    this.modal$ = this.IS._modal.pipe(tap((data) => (this.status = data)));
  }

  onCloseModal() {
    this.status = false;
  }
}
