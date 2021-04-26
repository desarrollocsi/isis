import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasAtencionesListComponent } from './consultas-atenciones-list.component';

describe('ConsultasAtencionesListComponent', () => {
  let component: ConsultasAtencionesListComponent;
  let fixture: ComponentFixture<ConsultasAtencionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasAtencionesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasAtencionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
