import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasReprogramarComponent } from './programaciondesalas-reprogramar.component';

describe('ProgramaciondesalasReprogramarComponent', () => {
  let component: ProgramaciondesalasReprogramarComponent;
  let fixture: ComponentFixture<ProgramaciondesalasReprogramarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasReprogramarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasReprogramarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
