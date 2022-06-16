import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionDatosdelacitaComponent } from './admision-datosdelacita.component';

describe('AdmisionDatosdelacitaComponent', () => {
  let component: AdmisionDatosdelacitaComponent;
  let fixture: ComponentFixture<AdmisionDatosdelacitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisionDatosdelacitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionDatosdelacitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
