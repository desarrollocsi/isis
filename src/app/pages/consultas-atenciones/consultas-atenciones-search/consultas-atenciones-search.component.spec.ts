import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasAtencionesSearchComponent } from './consultas-atenciones-search.component';

describe('ConsultasAtencionesSearchComponent', () => {
  let component: ConsultasAtencionesSearchComponent;
  let fixture: ComponentFixture<ConsultasAtencionesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasAtencionesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasAtencionesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
