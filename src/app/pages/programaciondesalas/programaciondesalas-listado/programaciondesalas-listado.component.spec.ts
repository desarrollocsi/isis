import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasListadoComponent } from './programaciondesalas-listado.component';

describe('ProgramaciondesalasListadoComponent', () => {
  let component: ProgramaciondesalasListadoComponent;
  let fixture: ComponentFixture<ProgramaciondesalasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
