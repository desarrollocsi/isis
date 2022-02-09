import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { FormdinamicoService } from '../services/formdinamico.service';

import {
  AuthStorageService,
  IntermedaryService,
  ToasterService,
} from 'src/app/core/services';

@Component({
  selector: 'app-formdinamico-modal',
  templateUrl: './formdinamico-modal.component.html',
  styleUrls: ['./formdinamico-modal.component.css'],
})
export class FormdinamicoModalComponent implements OnInit, OnDestroy {
  @Input() forms: Observable<any>;

  form$: Observable<object>;
  modal$: Observable<any>;
  data$: Observable<any>;
  form: FormGroup;
  estadoModal: boolean = false;
  URL: string;
  verboHtpp: string;
  buttonTitulo: string;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private IS: IntermedaryService,
    private FS: FormdinamicoService,
    private AUS: AuthStorageService,
    private TS: ToasterService
  ) {}

  get id() {
    return this.IS._idDataEdit;
  }

  get route() {
    return this.IS._route;
  }

  get usuario() {
    return this.AUS.User;
  }

  ngOnInit(): void {
    this.onOpenModal();
    this.onForm();
    this.onRoute();
    this.onData();
    this.IS.methodPost
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => this.setVerbo('POST'));

    this.IS.methodPut.pipe(takeUntil(this.unsubscribe$)).subscribe((_) => {
      this.setVerbo('PUT');
    });
  }

  setVerbo(verbo: string) {
    this.verboHtpp = verbo;
    this.buttonTitulo = verbo === 'POST' ? 'Registrar' : 'Actualizar';
  }

  onForm() {
    this.form$ = this.forms.pipe(
      tap((data) => {
        this.form = this.FS.formGroup(data);
        this.form.addControl('usuario', new FormControl(this.usuario));
      })
    );
  }

  onOpenModal() {
    this.IS.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => (this.estadoModal = true));
  }

  onCloseModal() {
    this.estadoModal = false;
    this.form.reset();
    this.form.controls.usuario.reset(this.usuario);
  }

  onData() {
    this.id
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.form.patchValue(data));
  }

  onRoute() {
    this.route
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.URL = data));
  }

  onSubmit() {
    this.FS.getApiDynamic(this.URL, this.verboHtpp, this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.TS.show('success', 'Bien hecho!', data.message, 2500);
        this.onCloseModal();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
