import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasAtencionesComponent } from './consultas-atenciones.component';

describe('ConsultasAtencionesComponent', () => {
  let component: ConsultasAtencionesComponent;
  let fixture: ComponentFixture<ConsultasAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
