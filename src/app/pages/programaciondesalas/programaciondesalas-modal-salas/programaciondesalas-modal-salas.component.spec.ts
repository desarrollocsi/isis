import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasModalSalasComponent } from './programaciondesalas-modal-salas.component';

describe('ProgramaciondesalasModalSalasComponent', () => {
  let component: ProgramaciondesalasModalSalasComponent;
  let fixture: ComponentFixture<ProgramaciondesalasModalSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasModalSalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasModalSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
