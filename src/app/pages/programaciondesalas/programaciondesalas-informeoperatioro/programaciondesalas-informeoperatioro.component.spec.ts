import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasInformeoperatioroComponent } from './programaciondesalas-informeoperatioro.component';

describe('ProgramaciondesalasInformeoperatioroComponent', () => {
  let component: ProgramaciondesalasInformeoperatioroComponent;
  let fixture: ComponentFixture<ProgramaciondesalasInformeoperatioroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasInformeoperatioroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasInformeoperatioroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
