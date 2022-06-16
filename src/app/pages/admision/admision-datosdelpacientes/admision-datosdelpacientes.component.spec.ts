import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionDatosdelpacientesComponent } from './admision-datosdelpacientes.component';

describe('AdmisionDatosdelpacientesComponent', () => {
  let component: AdmisionDatosdelpacientesComponent;
  let fixture: ComponentFixture<AdmisionDatosdelpacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisionDatosdelpacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionDatosdelpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
