import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasDisponibilidaddesalasComponent } from './programaciondesalas-disponibilidaddesalas.component';

describe('ProgramaciondesalasDisponibilidaddesalasComponent', () => {
  let component: ProgramaciondesalasDisponibilidaddesalasComponent;
  let fixture: ComponentFixture<ProgramaciondesalasDisponibilidaddesalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasDisponibilidaddesalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasDisponibilidaddesalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
