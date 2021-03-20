import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';

import { IntermedaryService } from 'src/app/core/services/intermedary.service';
import { FormdinamicoService } from '../services/formdinamico.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-formdinamico-add-edit',
  templateUrl: './formdinamico-add-edit.component.html',
  styleUrls: ['./formdinamico-add-edit.component.css'],
})
export class FormdinamicoAddEditComponent implements OnInit {
  formDynamic$: Observable<any>;
  form: FormGroup;
  URL: string;
  type: string = 'POST';

  constructor(
    private FS: FormdinamicoService,
    private fb: FormBuilder,
    private IS: IntermedaryService,
    private AS: AuthStorageService,
    private MS: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.onFormDynamic();
    this.onEdit();
  }

  onFormDynamic() {
    this.formDynamic$ = this.IS._route.pipe(
      take(1),
      tap((data: any) => {
        this.URL = data;
        this.type = 'POST';
      }),
      switchMap((data) => this.FS.getApiFormDynamic(data)),
      map((data: any) => {
        this.form = this.FS.formGroup(data);
        return data;
      })
    );
  }

  onEdit() {
    this.IS._dataDynamic
      .pipe(
        filter((data: any) => data !== ''),
        tap((_) => (this.type = 'PUT')),
        switchMap((data) => this.FS.getApiDynamic(this.URL, 'GET', data))
      )
      .subscribe((data: any) => {
        const user = this.AS.User;
        this.form.setValue(Object.assign(data, { usuario: user }));
      });
  }

  onNuevo() {
    this.type = 'POST';
    this.form.reset();
  }

  onSubmit() {
    // const type = this.type === undefined ? 'POST' : this.type;
    console.log(this.type);
    // this.FS.getApiDynamic(this.URL, type, this.form.value).subscribe((data) => {
    //   this.MS.MessageSucces(data['message']);
    //   this.form.reset();
    // });
  }
}
