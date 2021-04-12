import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { IntermedaryService } from 'src/app/core/services/intermedary.service';
import { FormdinamicoService } from '../services/formdinamico.service';

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
  status: boolean = false;
  URL: string;
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private IS: IntermedaryService,
    private FS: FormdinamicoService
  ) {}

  get route() {
    return this.IS._route;
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.onOpenModal();
    this.onForm();
    this.onRoute();
    this.onDataId();
  }

  onForm() {
    this.form$ = this.forms.pipe(
      tap((data) => (this.form = this.FS.formGroup(data)))
    );
  }

  onOpenModal() {
    this.IS.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_: any) => (this.status = true));
  }

  onCloseModal() {
    this.status = false;
    this.form.reset();
  }

  onDataId() {
    this.IS._idDataEdit
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.form.setValue(data));
  }

  onRoute() {
    this.route.pipe(take(1)).subscribe((data) => {
      this.URL = data;
    });
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.URL);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
